// ─── Palmistry / Hast Rekha Data ─────────────────────────────────────────────

export type PalmistryCategory =
  | "palm_type"
  | "major_line"
  | "minor_line"
  | "characteristics";

export interface PalmistryEntry {
  id: string;
  category: PalmistryCategory;
  icon: string;
  titleEn: string;
  titleHi: string;
  shortDescEn: string;
  shortDescHi: string;
  descriptionEn: string;
  descriptionHi: string;
  characteristicsEn?: string;
  characteristicsHi?: string;
  locationOnPalm?: string;
  benefitsEn?: string;
  benefitsHi?: string;
}

export const CATEGORY_META: Record<
  PalmistryCategory,
  {
    labelEn: string;
    labelHi: string;
    color: string;
    border: string;
    bg: string;
  }
> = {
  palm_type: {
    labelEn: "Palm Types",
    labelHi: "हाथ के प्रकार",
    color: "oklch(0.78 0.14 75)",
    border: "oklch(0.78 0.14 75 / 0.4)",
    bg: "oklch(0.78 0.14 75 / 0.12)",
  },
  major_line: {
    labelEn: "Major Lines",
    labelHi: "प्रमुख रेखाएं",
    color: "oklch(0.68 0.20 48)",
    border: "oklch(0.68 0.20 48 / 0.4)",
    bg: "oklch(0.68 0.20 48 / 0.12)",
  },
  minor_line: {
    labelEn: "Minor Lines",
    labelHi: "गौण रेखाएं",
    color: "oklch(0.72 0.16 175)",
    border: "oklch(0.72 0.16 175 / 0.4)",
    bg: "oklch(0.72 0.16 175 / 0.12)",
  },
  characteristics: {
    labelEn: "Characteristics",
    labelHi: "विशेषताएं",
    color: "oklch(0.68 0.15 290)",
    border: "oklch(0.68 0.15 290 / 0.4)",
    bg: "oklch(0.68 0.15 290 / 0.12)",
  },
};

export const SEED_PALMISTRY: PalmistryEntry[] = [
  // ── Palm Types ──────────────────────────────────────────────────────────────
  {
    id: "palm-air",
    category: "palm_type",
    icon: "🌬️",
    titleEn: "Air Hand (Vayu Hast)",
    titleHi: "वायु हस्त",
    shortDescEn:
      "Square palm with long fingers — sociable, intellectual, and restless",
    shortDescHi: "चौकोर हथेली और लंबी उंगलियां — सामाजिक, बौद्धिक और चंचल स्वभाव",
    descriptionEn:
      "Air hands are identified by a square-shaped palm with thin, clear lines and long fingers. People with air hands tend to be sociable, smart, and mentally agile. They crave mental stimulation, adapt easily to change, and often become excellent communicators. They seek harmony and intellectual depth in relationships.",
    descriptionHi:
      "वायु हस्त की पहचान चौकोर हथेली, पतली व स्पष्ट रेखाओं और लंबी उंगलियों से होती है। ऐसे लोग सामाजिक, बुद्धिमान और मानसिक रूप से चुस्त होते हैं। उन्हें मानसिक उत्तेजना की तलाश रहती है और परिवर्तन से आसानी से सामंजस्य बिठा लेते हैं।",
    characteristicsEn:
      "Square palm · Long fingers · Thin clear lines · Sociable nature · Intellectual curiosity · Restlessness · Love for communication · Mental agility",
    characteristicsHi:
      "चौकोर हथेली · लंबी उंगलियां · पतली स्पष्ट रेखाएं · सामाजिक स्वभाव · बौद्धिक जिज्ञासा · चंचलता · संचार प्रेम",
    locationOnPalm: "Overall palm shape and finger length ratio",
    benefitsEn:
      "Excellent careers in communication, writing, teaching, diplomacy, and any field requiring mental agility and social intelligence.",
    benefitsHi:
      "संचार, लेखन, शिक्षण, कूटनीति और मानसिक चपलता की आवश्यकता वाले क्षेत्रों में उत्कृष्ट करियर।",
  },
  {
    id: "palm-earth",
    category: "palm_type",
    icon: "🌍",
    titleEn: "Earth Hand (Prithvi Hast)",
    titleHi: "पृथ्वी हस्त",
    shortDescEn:
      "Square palm with short fingers — practical, grounded, and nature-connected",
    shortDescHi: "चौकोर हथेली और छोटी उंगलियां — व्यावहारिक, स्थिर और प्रकृति से जुड़ाव",
    descriptionEn:
      "Earth hands have a square-shaped palm with deep, thick, clear lines and short fingers. Natives with such hands tend to be practical, down-to-earth, and strongly connected to nature. They are straightforward, reliable, and excel in physical or hands-on work. In relationships they are loyal and grounded partners.",
    descriptionHi:
      "पृथ्वी हस्त में चौकोर हथेली, गहरी, मोटी और स्पष्ट रेखाएं तथा छोटी उंगलियां होती हैं। ऐसे लोग व्यावहारिक, स्थिर और प्रकृति से जुड़े होते हैं। ये विश्वसनीय और ईमानदार होते हैं तथा शारीरिक या हस्त-कार्यों में निपुण होते हैं।",
    characteristicsEn:
      "Square palm · Short fingers · Deep thick lines · Practical outlook · Nature connection · Reliability · Physical stamina · Straightforward",
    characteristicsHi:
      "चौकोर हथेली · छोटी उंगलियां · गहरी मोटी रेखाएं · व्यावहारिक दृष्टिकोण · प्रकृति-संबंध · विश्वसनीयता · शारीरिक क्षमता",
    locationOnPalm: "Overall palm shape, line depth, and finger-to-palm ratio",
    benefitsEn:
      "Thrives in agriculture, engineering, construction, medicine, and any career that requires steady hands and practical wisdom.",
    benefitsHi:
      "कृषि, इंजीनियरिंग, निर्माण, चिकित्सा और स्थिर व्यावहारिक ज्ञान की आवश्यकता वाले क्षेत्रों में उत्कृष्ट।",
  },
  {
    id: "palm-fire",
    category: "palm_type",
    icon: "🔥",
    titleEn: "Fire Hand (Agni Hast)",
    titleHi: "अग्नि हस्त",
    shortDescEn:
      "Long palm with short fingers — energetic, bold, and natural leaders",
    shortDescHi: "लंबी हथेली और छोटी उंगलियां — ऊर्जावान, साहसी और स्वाभाविक नेता",
    descriptionEn:
      "Fire hands are identified by a long palm with abundant lines and short fingers. The skin is warm and firm. These natives are natural risk-takers, leaders, and visionaries. In love they are passionate and positive. They inspire others with their enthusiasm and tend to take the initiative in all areas of life.",
    descriptionHi:
      "अग्नि हस्त में लंबी हथेली, अनेक रेखाएं और छोटी उंगलियां होती हैं। त्वचा गर्म और दृढ़ होती है। ये लोग स्वाभाविक जोखिम लेने वाले, नेता और दूरदर्शी होते हैं। प्रेम में उत्साही और सकारात्मक होते हैं।",
    characteristicsEn:
      "Long palm · Short fingers · Abundant lines · Warm firm skin · Leadership · Passion · Risk-taking · Visionary thinking",
    characteristicsHi:
      "लंबी हथेली · छोटी उंगलियां · अनेक रेखाएं · गर्म दृढ़ त्वचा · नेतृत्व · जुनून · जोखिम लेना · दूरदर्शिता",
    locationOnPalm: "Palm length vs width ratio; abundant minor lines",
    benefitsEn:
      "Excels in entrepreneurship, politics, sports, performing arts, and any field demanding passion and leadership.",
    benefitsHi: "उद्यमिता, राजनीति, खेल, प्रदर्शन कलाओं और नेतृत्व वाले क्षेत्रों में उत्कृष्ट।",
  },
  {
    id: "palm-water",
    category: "palm_type",
    icon: "🌊",
    titleEn: "Water Hand (Jal Hast)",
    titleHi: "जल हस्त",
    shortDescEn:
      "Long palm with long fingers — sensitive, creative, and intuitive",
    shortDescHi: "लंबी हथेली और लंबी उंगलियां — संवेदनशील, रचनात्मक और अंतर्ज्ञानी",
    descriptionEn:
      "Water hands have a long palm with thin, unclear but plentiful lines and long fingers. The skin is soft. These natives are emotional, creative, and highly intuitive. In love they tend to be sensitive, caring, and sometimes naive. Their artistic sensibility and empathy make them natural healers and artists.",
    descriptionHi:
      "जल हस्त में लंबी हथेली, पतली, अस्पष्ट किंतु अनेक रेखाएं और लंबी उंगलियां होती हैं। त्वचा मुलायम होती है। ये भावुक, रचनात्मक और अत्यंत अंतर्ज्ञानी होते हैं। प्रेम में संवेदनशील और देखभाल करने वाले होते हैं।",
    characteristicsEn:
      "Long palm · Long fingers · Soft skin · Many fine lines · Emotional depth · Creativity · Intuition · Empathy · Artistic nature",
    characteristicsHi:
      "लंबी हथेली · लंबी उंगलियां · मुलायम त्वचा · अनेक सूक्ष्म रेखाएं · भावनात्मक गहराई · रचनात्मकता · अंतर्ज्ञान · सहानुभूति",
    locationOnPalm: "Fine network of lines across entire palm",
    benefitsEn:
      "Gifted in arts, music, poetry, healing professions, psychology, and any field requiring emotional intelligence and creativity.",
    benefitsHi:
      "कला, संगीत, कविता, उपचार, मनोविज्ञान और भावनात्मक बुद्धि की आवश्यकता वाले क्षेत्रों में प्रतिभाशाली।",
  },

  // ── Major Lines ─────────────────────────────────────────────────────────────
  {
    id: "line-heart",
    category: "major_line",
    icon: "❤️",
    titleEn: "Heart Line (Hriday Rekha)",
    titleHi: "हृदय रेखा",
    shortDescEn:
      "Reveals love life, emotional nature, and relationship patterns",
    shortDescHi: "प्रेम जीवन, भावनात्मक स्वभाव और संबंधों को प्रकट करती है",
    descriptionEn:
      "The heart line runs horizontally near the top of the palm under the fingers. It governs all matters of the heart — love, relationships, emotional health, and romantic tendencies. Prosperity and hurdles in an individual's love life can be assessed through this line.",
    descriptionHi:
      "हृदय रेखा हाथ की उंगलियों के नीचे हथेली के ऊपरी हिस्से में क्षैतिज रूप से चलती है। यह रेखा प्रेम, संबंध, भावनात्मक स्वास्थ्य और रोमांटिक प्रवृत्तियों को नियंत्रित करती है।",
    characteristicsEn:
      "Starts from index finger → lucky in love · From middle finger → selfish in love · Between index & middle → head over heels · Deep line → emotional maturity · Curved upward → romantic idealism",
    characteristicsHi:
      "तर्जनी से शुरू → प्रेम में भाग्यशाली · मध्यमा से → स्वार्थी प्रेम · दोनों के बीच से → दीवानगी · गहरी रेखा → भावनात्मक परिपक्वता · ऊपर झुकी → रोमांटिक आदर्शवाद",
    locationOnPalm:
      "Horizontal line at the top of the palm, running under the fingers from the pinky side",
    benefitsEn:
      "Understanding this line helps navigate relationships, choose compatible partners, and develop emotional wisdom.",
    benefitsHi:
      "इस रेखा की समझ संबंधों को बेहतर बनाने, सही साथी चुनने और भावनात्मक बुद्धि विकसित करने में सहायता करती है।",
  },
  {
    id: "line-head",
    category: "major_line",
    icon: "🧠",
    titleEn: "Head Line (Mastishka Rekha)",
    titleHi: "मस्तिष्क रेखा",
    shortDescEn: "Reflects intellect, wisdom, decision-making style",
    shortDescHi: "बुद्धि, विवेक और निर्णय क्षमता को दर्शाती है",
    descriptionEn:
      "The head line runs horizontally across the middle of the palm. It provides information about wisdom, intellect, and learning style. A curvy line indicates creativity and spontaneous nature. A straight line reveals practical, analytical thinking.",
    descriptionHi:
      "मस्तिष्क रेखा हथेली के मध्य भाग में क्षैतिज रूप से चलती है। यह बुद्धि, विवेक और सीखने की शैली के बारे में जानकारी देती है। टेढ़ी रेखा रचनात्मकता और सहज स्वभाव दर्शाती है। सीधी रेखा व्यावहारिक सोच का संकेत है।",
    characteristicsEn:
      "Long straight → analytical, logical · Curvy downward → creative, artistic · Fork at end → dual intellect (practical + creative) · Short → focused thinking · Deeply marked → concentrated mind",
    characteristicsHi:
      "लंबी सीधी → विश्लेषणात्मक, तार्किक · नीचे झुकी → रचनात्मक, कलात्मक · द्विभाजन → दोहरी बुद्धि · छोटी → केंद्रित सोच · गहरी → एकाग्र मन",
    locationOnPalm:
      "Middle horizontal line starting between thumb and index finger",
    benefitsEn:
      "Reveals career aptitude, decision-making style, and the best fields for intellectual development.",
    benefitsHi:
      "करियर योग्यता, निर्णय-शैली और बौद्धिक विकास के लिए सर्वोत्तम क्षेत्रों को प्रकट करती है।",
  },
  {
    id: "line-life",
    category: "major_line",
    icon: "🌱",
    titleEn: "Life Line (Jeevan Rekha)",
    titleHi: "जीवन रेखा",
    shortDescEn: "Indicates vitality, life journey, and major transitions",
    shortDescHi: "जीवन शक्ति, जीवन यात्रा और महत्वपूर्ण बदलावों को दर्शाती है",
    descriptionEn:
      "The life line arcs around the thumb, originating between the index finger and thumb. It reveals life expectancy, vitality, and the overall journey of life. Contrary to popular belief, it does not predict death — rather it indicates major transitions, physical vitality, and life force.",
    descriptionHi:
      "जीवन रेखा अंगूठे के चारों ओर चाप बनाती है और तर्जनी व अंगूठे के बीच से शुरू होती है। यह जीवन शक्ति और जीवन यात्रा को दर्शाती है। लोकप्रिय धारणा के विपरीत यह मृत्यु नहीं बताती — बल्कि प्रमुख परिवर्तन और जीवन ऊर्जा दर्शाती है।",
    characteristicsEn:
      "Long deep → strong vitality · Short → focused intense life · Straight → smooth journey · Crooked → obstacles · Branches upward → success after struggle · Wide arc → energetic personality",
    characteristicsHi:
      "लंबी गहरी → मजबूत जीवनी शक्ति · छोटी → केंद्रित जीवन · सीधी → सहज यात्रा · टेढ़ी → बाधाएं · ऊपर शाखाएं → संघर्ष के बाद सफलता · चौड़ी चाप → ऊर्जावान व्यक्तित्व",
    locationOnPalm:
      "Curved arc from between thumb and index finger, circling around the thumb mount",
    benefitsEn:
      "Guides understanding of physical constitution, major life periods, and when to conserve or expand energy.",
    benefitsHi:
      "शारीरिक संरचना, प्रमुख जीवन कालों और ऊर्जा संरक्षण या विस्तार के समय को समझने में मार्गदर्शन करती है।",
  },
  {
    id: "line-fate",
    category: "major_line",
    icon: "⭐",
    titleEn: "Fate Line (Bhagya Rekha)",
    titleHi: "भाग्य रेखा",
    shortDescEn:
      "Career path, destiny, and ability to overcome life's challenges",
    shortDescHi: "करियर पथ, भाग्य और जीवन की चुनौतियों से उबरने की क्षमता",
    descriptionEn:
      "The fate line runs vertically up the center of the palm. Not every person has this line. When present, it indicates one's relationship with destiny and career. A deep fate line suggests strong dependence on fate; a shallow or broken one reveals a changeable life path.",
    descriptionHi:
      "भाग्य रेखा हथेली के केंद्र में ऊर्ध्वाधर रूप से ऊपर जाती है। हर व्यक्ति के हाथ में यह रेखा नहीं होती। जब होती है, तो यह भाग्य और करियर के साथ संबंध को दर्शाती है।",
    characteristicsEn:
      "Deep line → strong destiny reliance · Broken → changing life direction · Starting from life line → self-made success · Starting from wrist → career from young age · Forked top → dual career paths",
    characteristicsHi:
      "गहरी रेखा → भाग्य पर निर्भरता · खंडित → जीवन दिशा में बदलाव · जीवन रेखा से → स्वनिर्मित सफलता · कलाई से → कम उम्र में करियर · शीर्ष पर द्विशाखा → दोहरे करियर पथ",
    locationOnPalm:
      "Vertical line rising from the base of the palm (wrist) toward the middle finger",
    benefitsEn:
      "Reveals karmic path, best timing for career decisions, and whether success comes through effort or fortune.",
    benefitsHi:
      "कर्म पथ, करियर निर्णयों का सर्वोत्तम समय और सफलता परिश्रम से होगी या भाग्य से — यह प्रकट करती है।",
  },
  {
    id: "line-health",
    category: "major_line",
    icon: "💚",
    titleEn: "Health Line (Swasthya Rekha)",
    titleHi: "स्वास्थ्य रेखा",
    shortDescEn: "Physical health, vitality indicators, and potential ailments",
    shortDescHi: "शारीरिक स्वास्थ्य, जीवन शक्ति के संकेत और संभावित बीमारियां",
    descriptionEn:
      "The health line runs diagonally from the little finger mount toward the life line. It provides information about physical well-being, potential health challenges, and the body's constitution. Breaks indicate health disruptions; circles suggest surgeries.",
    descriptionHi:
      "स्वास्थ्य रेखा कनिष्ठा की जड़ से जीवन रेखा की ओर विकर्ण रूप से चलती है। यह शारीरिक स्वास्थ्य, संभावित स्वास्थ्य चुनौतियों और शरीर की संरचना के बारे में जानकारी देती है।",
    characteristicsEn:
      "Breaks → health disruptions or financial losses · Circles → surgeries or hospital stays · Criss-crosses → accidents · Forked → chronic conditions · Jagged → multiple ailments · Absent → naturally robust health",
    characteristicsHi:
      "खंड → स्वास्थ्य व्यवधान या आर्थिक हानि · वृत्त → ऑपरेशन या अस्पताल · क्रॉस → दुर्घटनाएं · द्विशाखा → दीर्घकालिक स्थितियां · टेढ़ी → अनेक बीमारियां · अनुपस्थित → स्वाभाविक रूप से मजबूत स्वास्थ्य",
    locationOnPalm:
      "Diagonal line from the mount of Mercury (under pinky) toward the life line",
    benefitsEn:
      "Helps identify health-prone periods, take preventive measures, and understand the body's natural constitution.",
    benefitsHi:
      "स्वास्थ्य-प्रवण काल की पहचान करने, निवारक उपाय करने और शरीर की स्वाभाविक संरचना समझने में सहायता करती है।",
  },

  // ── Minor Lines ──────────────────────────────────────────────────────────────
  {
    id: "line-fame",
    category: "minor_line",
    icon: "🌟",
    titleEn: "Fame Line / Sun Line (Yash Rekha)",
    titleHi: "यश रेखा / सूर्य रेखा",
    shortDescEn: "Indicates talent, fame, wealth, and reputation in society",
    shortDescHi: "प्रतिभा, यश, धन और समाज में प्रतिष्ठा का संकेत",
    descriptionEn:
      "The fame line (also called Sun line) runs parallel to the fate line and indicates wealth, reputation, and talent. It is very rare — not every person has it. When present, it amplifies success indicated by other lines. It represents creative talent, public recognition, and financial abundance.",
    descriptionHi:
      "यश रेखा (जिसे सूर्य रेखा भी कहते हैं) भाग्य रेखा के समानांतर चलती है और धन, प्रतिष्ठा तथा प्रतिभा का संकेत देती है। यह अत्यंत दुर्लभ है। जब होती है तो अन्य रेखाओं द्वारा दर्शायी सफलता को बढ़ाती है।",
    characteristicsEn:
      "Present → amplified success · Long deep → lasting fame · Short → specific recognition · Multiple lines → versatile talents · Reaches sun mount → artistic peak",
    characteristicsHi:
      "उपस्थित → बढ़ी हुई सफलता · लंबी गहरी → स्थायी प्रसिद्धि · छोटी → विशिष्ट मान्यता · अनेक → बहुमुखी प्रतिभा",
    locationOnPalm:
      "Vertical line on the ring finger side (Apollo mount), parallel to fate line",
    benefitsEn:
      "Reveals creative potential, periods of recognition, and alignment with artistic or public-facing careers.",
    benefitsHi:
      "रचनात्मक क्षमता, पहचान के काल और कलात्मक या सार्वजनिक करियर के साथ संरेखण प्रकट करती है।",
  },
  {
    id: "line-marriage",
    category: "minor_line",
    icon: "💍",
    titleEn: "Marriage Lines (Vivah Rekhaen)",
    titleHi: "विवाह रेखाएं",
    shortDescEn:
      "Short lines revealing relationships, marriages, and partnerships",
    shortDescHi: "छोटी रेखाएं जो संबंधों, विवाह और साझेदारी को दर्शाती हैं",
    descriptionEn:
      "Marriage lines are short horizontal lines present on the side of the palm, under the little finger. They reveal information about significant relationships and marriages. Multiple lines suggest multiple relationships; a deep clear line indicates a strong lasting union.",
    descriptionHi:
      "विवाह रेखाएं हथेली के किनारे पर, कनिष्ठा के नीचे, छोटी क्षैतिज रेखाएं होती हैं। ये महत्वपूर्ण संबंधों और विवाह के बारे में जानकारी देती हैं।",
    characteristicsEn:
      "Multiple lines → multiple significant relationships · Fragmented → troubled relationship · Forked → separation or divorce · Deep line → strong lasting union · Upward branch → successful marriage",
    characteristicsHi:
      "अनेक रेखाएं → अनेक महत्वपूर्ण संबंध · खंडित → कठिन संबंध · द्विशाखा → अलगाव · गहरी रेखा → मजबूत स्थायी विवाह · ऊपर शाखा → सफल विवाह",
    locationOnPalm:
      "Short horizontal lines on the percussion (side) of the palm below the little finger",
    benefitsEn:
      "Provides insight into timing of marriage, nature of relationships, and compatibility in partnerships.",
    benefitsHi:
      "विवाह के समय, संबंधों की प्रकृति और साझेदारी में अनुकूलता के बारे में अंतर्दृष्टि प्रदान करती हैं।",
  },
  {
    id: "line-children",
    category: "minor_line",
    icon: "👶",
    titleEn: "Children Lines (Santan Rekhaen)",
    titleHi: "संतान रेखाएं",
    shortDescEn: "Vertical lines revealing children and deeply connected souls",
    shortDescHi: "संतान और गहरे जुड़े प्राणियों को दर्शाने वाली ऊर्ध्वाधर रेखाएं",
    descriptionEn:
      "Children lines are vertical lines present just below the little finger, developing through love or marriage lines. They can represent your own children, grandchildren, adopted children, or children you share a deep bond with — like nieces, nephews, or a neighbor's child.",
    descriptionHi:
      "संतान रेखाएं कनिष्ठा के ठीक नीचे, विवाह रेखाओं के माध्यम से विकसित होने वाली ऊर्ध्वाधर रेखाएं हैं। ये आपके अपने बच्चे, पोते-पोतियां, दत्तक बच्चे, या जिन बच्चों से गहरा लगाव हो — उन्हें दर्शा सकती हैं।",
    characteristicsEn:
      "Number of lines → number of deeply bonded children · Strong lines → healthy strong children · Faint lines → delicate constitution · Vertical alignment → close relationship",
    characteristicsHi:
      "रेखाओं की संख्या → गहरे जुड़े बच्चों की संख्या · मजबूत रेखाएं → स्वस्थ बच्चे · हल्की रेखाएं → नाजुक संरचना",
    locationOnPalm:
      "Vertical lines just below the little finger, rising from marriage lines",
    benefitsEn:
      "Reveals parenthood potential and the depth of bonds with the next generation.",
    benefitsHi:
      "माता-पिता बनने की क्षमता और अगली पीढ़ी के साथ बंधन की गहराई प्रकट करती हैं।",
  },
  {
    id: "line-intuition",
    category: "minor_line",
    icon: "🔮",
    titleEn: "Intuition Line (Antargyan Rekha)",
    titleHi: "अंतर्ज्ञान रेखा",
    shortDescEn:
      "Rare line indicating deep psychic insight and spiritual gifts",
    shortDescHi: "गहरी आध्यात्मिक अंतर्दृष्टि और मानसिक शक्तियों का दुर्लभ संकेत",
    descriptionEn:
      "The intuition line runs parallel to the life line and indicates deep insight into life's patterns. If prominent, deeper, and longer, the native possesses psychic or intuitive abilities. It is not easy to detect and can be entirely absent. When present, it marks a highly perceptive individual.",
    descriptionHi:
      "अंतर्ज्ञान रेखा जीवन रेखा के समानांतर चलती है और जीवन के पैटर्न में गहरी अंतर्दृष्टि दर्शाती है। यदि स्पष्ट, गहरी और लंबी हो, तो व्यक्ति में मानसिक या अंतर्ज्ञानी क्षमताएं होती हैं।",
    characteristicsEn:
      "Prominent deep → strong psychic ability · Faint → latent intuition · Curved → emotional sensitivity · Absent → relies on logic rather than intuition",
    characteristicsHi:
      "स्पष्ट गहरी → मजबूत मानसिक क्षमता · हल्की → सुप्त अंतर्ज्ञान · घुमावदार → भावनात्मक संवेदनशीलता · अनुपस्थित → तर्क पर निर्भरता",
    locationOnPalm:
      "Curved line on the inner edge of the palm, parallel and inside the life line",
    benefitsEn:
      "Signals spiritual gifts, counseling abilities, and potential for deep healing or prophetic work.",
    benefitsHi:
      "आध्यात्मिक उपहार, परामर्श क्षमताएं और गहरी उपचार या भविष्यवाणी कार्य की संभावना दर्शाती है।",
  },
  {
    id: "line-mercury",
    category: "minor_line",
    icon: "💰",
    titleEn: "Mercury Line (Buddhi Rekha)",
    titleHi: "बुध रेखा",
    shortDescEn: "Business acumen, communication skills, and financial health",
    shortDescHi: "व्यापारिक कुशलता, संचार क्षमता और आर्थिक स्वास्थ्य",
    descriptionEn:
      "The Mercury line runs vertically from the base of the little finger down toward the wrist. It governs business ability, communication, health (especially digestive and nervous system), and financial acumen. A strong Mercury line indicates a talented communicator and businessman.",
    descriptionHi:
      "बुध रेखा कनिष्ठा की जड़ से कलाई की ओर ऊर्ध्वाधर रूप से चलती है। यह व्यापारिक क्षमता, संचार, स्वास्थ्य (विशेषकर पाचन और तंत्रिका तंत्र) और वित्तीय कुशलता को नियंत्रित करती है।",
    characteristicsEn:
      "Strong clear → excellent business and communication · Broken → health or financial setbacks · Multiple lines → versatile skills · Absent → intuitive rather than systematic business approach",
    characteristicsHi:
      "मजबूत स्पष्ट → उत्कृष्ट व्यापार और संचार · खंडित → स्वास्थ्य या वित्तीय असफलताएं · अनेक → बहुमुखी कौशल",
    locationOnPalm:
      "Vertical line on the pinky side, from the Mercury mount down toward the wrist",
    benefitsEn:
      "Guides business decisions, communication strategies, and health maintenance practices.",
    benefitsHi:
      "व्यापारिक निर्णयों, संचार रणनीतियों और स्वास्थ्य रखरखाव प्रथाओं का मार्गदर्शन करती है।",
  },

  // ── Characteristics ──────────────────────────────────────────────────────────
  {
    id: "char-which-hand",
    category: "characteristics",
    icon: "🤲",
    titleEn: "Which Hand to Read?",
    titleHi: "कौन सा हाथ देखें?",
    shortDescEn:
      "Dominant hand reveals karma; passive hand reveals innate destiny",
    shortDescHi: "प्रमुख हाथ कर्म दर्शाता है; निष्क्रिय हाथ जन्मजात भाग्य बताता है",
    descriptionEn:
      "According to Vedic Astrology, the dominant hand (the one used for all tasks) is taken for primary palm reading. The passive hand is also assessed to note inherited characteristics and natural abilities. With the dominant hand alone, a person can evaluate their future potential.",
    descriptionHi:
      "वैदिक ज्योतिष के अनुसार, प्रमुख हाथ (जो सभी कार्यों के लिए उपयोग किया जाता है) को प्राथमिक हस्त पठन के लिए लिया जाता है। निष्क्रिय हाथ से विरासत में मिली विशेषताओं और प्राकृतिक योग्यताओं का आकलन किया जाता है।",
    characteristicsEn:
      "Right hand (dominant for most) → active karma, current life path · Left hand → inherited traits, past life karma, soul's innate gifts · Both hands together → complete life picture",
    characteristicsHi:
      "दायां हाथ (अधिकांश के लिए प्रमुख) → सक्रिय कर्म, वर्तमान जीवन पथ · बायां हाथ → विरासत में मिले गुण, पूर्वजन्म कर्म, आत्मा के जन्मजात उपहार · दोनों हाथ → सम्पूर्ण जीवन चित्र",
    locationOnPalm: "Entire palm — comparison between both hands",
    benefitsEn:
      "Reading both hands together provides the most complete and accurate palmistry analysis.",
    benefitsHi:
      "दोनों हाथों को एक साथ पढ़ने से सबसे पूर्ण और सटीक हस्तरेखा विश्लेषण प्राप्त होता है।",
  },
  {
    id: "char-vedic",
    category: "characteristics",
    icon: "📿",
    titleEn: "Vedic Palmistry (Hasta Samudrika Shastra)",
    titleHi: "हस्त सामुद्रिक शास्त्र",
    shortDescEn:
      "Ancient Indian science of reading palms as part of Vedic Astrology",
    shortDescHi: "वैदिक ज्योतिष के अंग के रूप में हस्तरेखा पढ़ने का प्राचीन भारतीय विज्ञान",
    descriptionEn:
      "Palmistry is known as Hasta Samudrika Shastra and is considered an innate part of Vedic Astrology. When conducted from a Vedic viewpoint, it helps individuals introspect their lives deeply. The hands are considered determiners of fate. Various planets are believed to be situated in different areas of the palm.",
    descriptionHi:
      "हस्तरेखा विद्या को हस्त सामुद्रिक शास्त्र कहा जाता है और इसे वैदिक ज्योतिष का अविभाज्य अंग माना जाता है। वैदिक दृष्टिकोण से आयोजित होने पर यह व्यक्तियों को अपने जीवन का गहन आत्मनिरीक्षण करने में सहायता करती है।",
    characteristicsEn:
      "Jupiter mount (index finger base) → wisdom, authority · Saturn mount (middle finger) → discipline, karma · Sun/Apollo mount (ring finger) → creativity, fame · Mercury mount (pinky base) → communication, business · Venus mount (thumb base) → love, sensuality · Moon mount (base opposite thumb) → intuition, emotions",
    characteristicsHi:
      "बृहस्पति पर्वत (तर्जनी जड़) → ज्ञान, अधिकार · शनि पर्वत (मध्यमा) → अनुशासन, कर्म · सूर्य पर्वत (अनामिका) → रचनात्मकता, यश · बुध पर्वत (कनिष्ठा जड़) → संचार, व्यापार · शुक्र पर्वत (अंगूठा जड़) → प्रेम, कामुकता · चंद्र पर्वत (कलाई के ऊपर विपरीत) → अंतर्ज्ञान, भावनाएं",
    locationOnPalm: "Planetary mounts distributed across the entire palm",
    benefitsEn:
      "Integrates palmistry with planetary wisdom for comprehensive life guidance.",
    benefitsHi:
      "व्यापक जीवन मार्गदर्शन के लिए हस्तरेखा को ग्रहीय ज्ञान के साथ एकीकृत करती है।",
  },
  {
    id: "char-mounts",
    category: "characteristics",
    icon: "🏔️",
    titleEn: "Mounts of the Palm (Parvat)",
    titleHi: "हस्त के पर्वत",
    shortDescEn: "Raised fleshy areas on the palm linked to planetary energies",
    shortDescHi: "हथेली पर उभरे हुए मांसल क्षेत्र जो ग्रहीय ऊर्जाओं से जुड़े हैं",
    descriptionEn:
      "The mounts are the fleshy, raised pads on the palm, each governed by a planet. A well-developed mount amplifies the planet's positive qualities. A flat or underdeveloped mount indicates weak planetary influence. Overdeveloped mounts can indicate excess or imbalance.",
    descriptionHi:
      "पर्वत हथेली पर मांसल उभरे हुए भाग हैं, प्रत्येक एक ग्रह द्वारा शासित। अच्छी तरह विकसित पर्वत ग्रह के सकारात्मक गुणों को बढ़ाता है। चपटा या अविकसित पर्वत कमजोर ग्रहीय प्रभाव दर्शाता है।",
    characteristicsEn:
      "Well-developed → strong planetary gifts · Flat → weak influence needing development · Overdeveloped → excess or imbalance · Position → relative position modifies meaning",
    characteristicsHi:
      "अच्छी तरह विकसित → मजबूत ग्रहीय उपहार · चपटा → विकास की आवश्यकता · अति विकसित → अधिकता या असंतुलन",
    locationOnPalm:
      "Raised pads throughout the palm at the base of each finger and at palm edges",
    benefitsEn:
      "Understanding mounts reveals natural talents, energetic strengths, and areas needing attention.",
    benefitsHi:
      "पर्वतों को समझना प्राकृतिक प्रतिभाओं, ऊर्जावान शक्तियों और ध्यान देने वाले क्षेत्रों को प्रकट करता है।",
  },
  {
    id: "char-fingers",
    category: "characteristics",
    icon: "👆",
    titleEn: "Finger Lengths & Meaning",
    titleHi: "उंगलियों की लंबाई और अर्थ",
    shortDescEn:
      "Each finger's length reveals personality and planetary influence",
    shortDescHi: "प्रत्येक उंगली की लंबाई व्यक्तित्व और ग्रहीय प्रभाव दर्शाती है",
    descriptionEn:
      "The length, shape, and flexibility of fingers provides crucial personality information. In Vedic palmistry, each finger is associated with a specific planet: Index (Jupiter), Middle (Saturn), Ring (Sun/Apollo), Little (Mercury). Relative lengths and proportions reveal dominant traits.",
    descriptionHi:
      "उंगलियों की लंबाई, आकार और लचीलापन महत्वपूर्ण व्यक्तित्व जानकारी प्रदान करते हैं। वैदिक हस्तरेखा में प्रत्येक उंगली एक विशिष्ट ग्रह से जुड़ी है: तर्जनी (बृहस्पति), मध्यमा (शनि), अनामिका (सूर्य), कनिष्ठा (बुध)।",
    characteristicsEn:
      "Long index → natural leader · Short index → lacks confidence · Long ring → artistic, fame-seeking · Short ring → modest · Long little → communicative · Short little → shy · Equal index & ring → balanced ambition",
    characteristicsHi:
      "लंबी तर्जनी → स्वाभाविक नेता · छोटी तर्जनी → आत्मविश्वास की कमी · लंबी अनामिका → कलात्मक · लंबी कनिष्ठा → संचारी · छोटी कनिष्ठा → शर्मीला",
    locationOnPalm: "All four fingers and thumb",
    benefitsEn:
      "Finger analysis provides quick personality insights and helps identify natural leadership and creative potential.",
    benefitsHi:
      "उंगली विश्लेषण त्वरित व्यक्तित्व अंतर्दृष्टि प्रदान करता है और स्वाभाविक नेतृत्व व रचनात्मक क्षमता की पहचान करने में मदद करता है।",
  },
];
