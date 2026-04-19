// Nakshatra descriptions for all 27 Nakshatras

export interface NakshatraDescription {
  nakshatra: number;
  name: string;
  nameHi: string;
  lord: string;
  pada: number;
  prediction: { en: string; hi: string };
  educationIncome: { en: string; hi: string };
  familyLife: { en: string; hi: string };
}

export const NAKSHATRA_DESCRIPTIONS: NakshatraDescription[] = [
  {
    nakshatra: 1,
    name: "Ashwini",
    nameHi: "अश्विनी",
    lord: "Ketu",
    pada: 4,
    prediction: {
      en: "You are energetic, pioneering, and quick to act. The healing energy of the Ashwini Kumars blesses you with vitality and the ability to start fresh. You are independent and courageous with a natural gift for helping others. Swift in your actions, you bring momentum wherever you go.",
      hi: "आप ऊर्जावान, अग्रणी और शीघ्र कार्यकर्ता हैं। अश्विनी कुमारों की उपचार ऊर्जा आपको जीवन शक्ति और नई शुरुआत का वरदान देती है। स्वतंत्र और साहसी, दूसरों की मदद की प्राकृतिक प्रतिभा।",
    },
    educationIncome: {
      en: "Suited for medicine, sports, military, engineering, and healing professions. Quick learner with practical intelligence. Income through service, healthcare, or entrepreneurship.",
      hi: "चिकित्सा, खेल, सैन्य, इंजीनियरिंग और उपचार व्यवसाय अनुकूल। व्यावहारिक बुद्धि से शीघ्र सीखने वाले। सेवा या उद्यमिता से आय।",
    },
    familyLife: {
      en: "Loving but independent. May marry early and need personal space in relationships. Good relationship with siblings. Spouse is supportive and energetic.",
      hi: "प्रेमपूर्ण लेकिन स्वतंत्र। जल्दी विवाह की संभावना। भाई-बहनों से अच्छे संबंध। जीवनसाथी सहायक और ऊर्जावान।",
    },
  },
  {
    nakshatra: 2,
    name: "Bharani",
    nameHi: "भरणी",
    lord: "Venus",
    pada: 4,
    prediction: {
      en: "You carry the weight of life and death energies — creative and destructive in equal measure. Highly creative and sensual, you have strong willpower and the ability to transform yourself repeatedly. Your life involves intense experiences that lead to profound growth.",
      hi: "जीवन और मृत्यु की ऊर्जाओं का बोझ वहन करते हैं। अत्यंत रचनात्मक और संवेदनशील, मजबूत इच्छाशक्ति और बार-बार खुद को बदलने की क्षमता। जीवन में गहन अनुभव।",
    },
    educationIncome: {
      en: "Talent in arts, fashion, luxury goods, entertainment, and occult sciences. Strong earning potential through creative professions. Discipline is needed to avoid financial extremes.",
      hi: "कला, फैशन, विलासिता, मनोरंजन और गुप्त विज्ञान में प्रतिभा। रचनात्मक व्यवसायों से मजबूत आय। वित्तीय चरम से बचने के लिए अनुशासन जरूरी।",
    },
    familyLife: {
      en: "Intensely devoted to family but can be possessive. Passionate love life. Children bring great joy. Relationships need balance of give and take.",
      hi: "परिवार के प्रति गहरी भक्ति लेकिन कभी-कभी अधिकारपूर्ण। जोशीला प्रेम जीवन। बच्चे बड़ी खुशी लाते हैं।",
    },
  },
  {
    nakshatra: 3,
    name: "Krittika",
    nameHi: "कृत्तिका",
    lord: "Sun",
    pada: 4,
    prediction: {
      en: "Ruled by the cosmic fire of Agni, you are a natural purifier with the ability to cut through illusion. Strong willpower, leadership potential, and the ability to nurture others while maintaining firm boundaries. Sharp intellect and strong spiritual inclinations.",
      hi: "अग्नि के नेतृत्व में, आप एक प्राकृतिक शुद्धिकर्ता हैं। तीव्र इच्छाशक्ति, नेतृत्व क्षमता और दूसरों का पोषण करते हुए सीमाएं बनाए रखने की क्षमता।",
    },
    educationIncome: {
      en: "Military, administration, cooking, metallurgy, and spiritual professions. Strong earning through leadership roles. Creative work and manufacturing are also favorable.",
      hi: "सैन्य, प्रशासन, खाना पकाना, धातुकर्म और आध्यात्मिक व्यवसाय। नेतृत्व भूमिकाओं से मजबूत आय।",
    },
    familyLife: {
      en: "Protective and devoted parent and partner. May experience separation from home or family early. Spouse relationship has both warmth and friction. Deep bonds with children.",
      hi: "सुरक्षात्मक और समर्पित। प्रारंभ में घर या परिवार से अलगाव। जीवनसाथी से गर्मजोशी और घर्षण दोनों।",
    },
  },
  {
    nakshatra: 4,
    name: "Rohini",
    nameHi: "रोहिणी",
    lord: "Moon",
    pada: 4,
    prediction: {
      en: "Moon's most beloved nakshatra, Rohini blesses you with beauty, creativity, and material abundance. You have a magnetic personality, great aesthetic sense, and the ability to manifest your desires. You love comfort and beauty in all forms.",
      hi: "चंद्र की सबसे प्रिय नक्षत्र, रोहिणी आपको सुंदरता, रचनात्मकता और भौतिक समृद्धि का आशीर्वाद देती है। चुंबकीय व्यक्तित्व और महान सौंदर्य बोध।",
    },
    educationIncome: {
      en: "Arts, music, agriculture, farming, luxury goods, beauty industry, and hospitality. Excellent financial potential. Property and land investments are favorable.",
      hi: "कला, संगीत, कृषि, विलासिता, सौंदर्य उद्योग और आतिथ्य। उत्कृष्ट वित्तीय क्षमता। संपत्ति और भूमि निवेश अनुकूल।",
    },
    familyLife: {
      en: "Deeply loving and devoted family person. Marriage brings prosperity and happiness. Spouse is beautiful and supportive. Children bring great fulfillment.",
      hi: "गहरे प्रेमपूर्ण परिवार वाले। विवाह से समृद्धि और खुशी। जीवनसाथी सुंदर और सहायक।",
    },
  },
  {
    nakshatra: 5,
    name: "Mrigashira",
    nameHi: "मृगशिरा",
    lord: "Mars",
    pada: 4,
    prediction: {
      en: "Like the deer searching for the celestial fragrance, you are always on a quest — curious, restless, and perpetually seeking. You are gifted with communicative abilities and a gentle, refined nature that makes you delightful company. You seek beauty and truth simultaneously.",
      hi: "स्वर्गीय सुगंध की तलाश में हिरण की तरह, आप हमेशा खोज में हैं — जिज्ञासु, बेचैन और अनंत तलाश में। संचार में प्रतिभाशाली और कोमल स्वभाव।",
    },
    educationIncome: {
      en: "Writing, research, travel industry, fashion, textile, perfumery, and communication. Multiple income streams often develop naturally. Versatile intellect serves well in varied fields.",
      hi: "लेखन, अनुसंधान, यात्रा उद्योग, फैशन, वस्त्र और संचार। कई आय स्रोत स्वाभाविक रूप से विकसित होते हैं।",
    },
    familyLife: {
      en: "Charming but may be restless in relationships. Marriage after some searching for the right partner. Strong connection with siblings. Spouse is intellectual and communicative.",
      hi: "आकर्षक लेकिन रिश्तों में बेचैनी। सही साथी खोजने के बाद विवाह। भाई-बहनों से मजबूत संबंध।",
    },
  },
  {
    nakshatra: 6,
    name: "Ardra",
    nameHi: "आर्द्रा",
    lord: "Rahu",
    pada: 4,
    prediction: {
      en: "Ruled by Rudra the storm god, your life involves intense transformations through storms. You have a sharp, penetrating mind and the ability to see through pretense. After periods of destruction, renewal emerges. You are gifted with intellectual depth and scientific aptitude.",
      hi: "रुद्र देव के अधीन, आपके जीवन में तूफानों के माध्यम से तीव्र परिवर्तन आते हैं। तेज और गहरी बुद्धि, दिखावे को पहचानने की क्षमता। विनाश के बाद नवीनीकरण आता है।",
    },
    educationIncome: {
      en: "Science, research, medicine, technology, writing, and analysis. Strong analytical mind brings success in intellectual professions. Engineering and data analysis are particularly favorable.",
      hi: "विज्ञान, अनुसंधान, चिकित्सा, प्रौद्योगिकी, लेखन और विश्लेषण। बौद्धिक व्यवसायों में सफलता। इंजीनियरिंग और डेटा विश्लेषण विशेष रूप से अनुकूल।",
    },
    familyLife: {
      en: "Complex emotional life with deep transformations. Relationships go through stormy phases before finding stability. Devoted parent with high expectations.",
      hi: "जटिल भावनात्मक जीवन। रिश्ते स्थिरता खोजने से पहले तूफानी चरणों से गुजरते हैं। उच्च उम्मीदों वाले समर्पित माता-पिता।",
    },
  },
  {
    nakshatra: 7,
    name: "Punarvasu",
    nameHi: "पुनर्वसु",
    lord: "Jupiter",
    pada: 4,
    prediction: {
      en: "The star of renewal and return, Punarvasu blesses you with optimism and the ability to bounce back from adversity. You are blessed with Jupiter's wisdom and have a deeply philosophical and spiritually inclined nature. Home and family are your greatest sources of happiness.",
      hi: "नवीनीकरण और वापसी का तारा, पुनर्वसु आपको आशावाद और प्रतिकूलता से उबरने का वरदान देता है। गुरु की बुद्धि से धन्य, दार्शनिक और आध्यात्मिक स्वभाव।",
    },
    educationIncome: {
      en: "Teaching, religion, philosophy, writing, real estate, and counseling. Multiple attempts at success with eventual triumph. Wealth comes in waves but accumulates well.",
      hi: "शिक्षण, धर्म, दर्शन, लेखन, रियल एस्टेट और परामर्श। सफलता के कई प्रयास, अंततः विजय। धन लहरों में आता है।",
    },
    familyLife: {
      en: "Strong family values and deep attachment to home. May change residence multiple times. Loving spouse and well-settled children. Excellent relationship with parents.",
      hi: "मजबूत पारिवारिक मूल्य और घर से गहरा लगाव। कई बार निवास बदल सकते हैं। प्रेमपूर्ण जीवनसाथी और सुव्यवस्थित बच्चे।",
    },
  },
  {
    nakshatra: 8,
    name: "Pushya",
    nameHi: "पुष्य",
    lord: "Saturn",
    pada: 4,
    prediction: {
      en: "Considered the most auspicious nakshatra, Pushya blesses you with nourishment, abundance, and the ability to give generously to others. Saturn's discipline combined with Jupiter's rulership makes you dependable, wise, and deeply capable of sustaining others.",
      hi: "सबसे शुभ नक्षत्र माना जाता है, पुष्य आपको पोषण, प्रचुरता और उदारता का वरदान देता है। शनि का अनुशासन और गुरु की बुद्धि आपको विश्वसनीय और बुद्धिमान बनाती है।",
    },
    educationIncome: {
      en: "Finance, banking, food industry, teaching, medicine, and social service. Excellent wealth-building potential. Property and investments yield strong returns.",
      hi: "वित्त, बैंकिंग, खाद्य उद्योग, शिक्षण, चिकित्सा और सामाजिक सेवा। उत्कृष्ट धन-निर्माण क्षमता।",
    },
    familyLife: {
      en: "Deeply devoted to family and extremely nurturing parent. Marriage is stable and supportive. Children are well-nurtured and successful. Close bonds with parents and in-laws.",
      hi: "परिवार के प्रति गहरी भक्ति और अत्यंत पोषणकारी माता-पिता। स्थिर और सहायक विवाह। बच्चे सुपोषित और सफल।",
    },
  },
  {
    nakshatra: 9,
    name: "Ashlesha",
    nameHi: "आश्लेषा",
    lord: "Mercury",
    pada: 4,
    prediction: {
      en: "The serpent nakshatra bestows kundalini wisdom, penetrating intelligence, and the ability to see hidden truths. You have powerful intuition and strategic intelligence. You can be deeply persuasive and are gifted with healing and mystical knowledge.",
      hi: "सर्प नक्षत्र कुंडलिनी ज्ञान, गहरी बुद्धि और छिपी सच्चाइयों को देखने की क्षमता देता है। शक्तिशाली अंतर्ज्ञान और रणनीतिक बुद्धि।",
    },
    educationIncome: {
      en: "Medicine, psychology, occult sciences, research, IT, and law. Excellent strategic thinker. Multiple income sources through intelligence and skill.",
      hi: "चिकित्सा, मनोविज्ञान, गुप्त विज्ञान, अनुसंधान, आईटी और कानून। उत्कृष्ट रणनीतिक विचारक।",
    },
    familyLife: {
      en: "Complex relationships with deep undercurrents. Extremely protective of family. May have challenging relationship with mother. Loyal but hard to fully know.",
      hi: "गहरी अंतर्धाराओं वाले जटिल रिश्ते। परिवार के प्रति अत्यंत सुरक्षात्मक। माता के साथ चुनौतीपूर्ण संबंध हो सकते हैं।",
    },
  },
  {
    nakshatra: 10,
    name: "Magha",
    nameHi: "मघा",
    lord: "Ketu",
    pada: 4,
    prediction: {
      en: "The royal nakshatra of ancestors and past karma. You have a natural sense of authority, dignity, and leadership. Deeply connected to ancestral lineage and traditional values. You command respect naturally and have powerful ambitions for legacy and recognition.",
      hi: "पूर्वजों और पूर्व कर्म की शाही नक्षत्र। अधिकार, गरिमा और नेतृत्व का स्वाभाविक बोध। पैतृक वंश और पारंपरिक मूल्यों से गहरा संबंध।",
    },
    educationIncome: {
      en: "Administration, politics, royalty-related professions, theater, history, and spiritual lineages. Success through recognition and authority. Ancestral inheritance possible.",
      hi: "प्रशासन, राजनीति, रंगमंच, इतिहास और आध्यात्मिक परंपराएं। पहचान और अधिकार के माध्यम से सफलता।",
    },
    familyLife: {
      en: "Strong sense of family honor and pride. Deep reverence for ancestors and elders. Marriage to a dignified, respected partner. Children carry on family legacy.",
      hi: "पारिवारिक सम्मान और गर्व की तीव्र भावना। पूर्वजों और बड़ों के प्रति गहरी श्रद्धा। गरिमामय जीवनसाथी।",
    },
  },
  {
    nakshatra: 11,
    name: "Purva Phalguni",
    nameHi: "पूर्वा फाल्गुनी",
    lord: "Venus",
    pada: 4,
    prediction: {
      en: "The star of pleasure and creativity, ruled by Bhaga the god of good fortune. You are blessed with artistic talent, social grace, and the ability to enjoy life fully. Creative expression flows naturally and you attract beauty and comfort wherever you go.",
      hi: "आनंद और रचनात्मकता का तारा, भाग्य देव भग के अधीन। कलात्मक प्रतिभा, सामाजिक अनुग्रह और जीवन का पूर्ण आनंद लेने की क्षमता।",
    },
    educationIncome: {
      en: "Entertainment, arts, luxury goods, beauty, hospitality, and creative fields. Multiple talents lead to varied income streams. Partnerships and collaborations are highly successful.",
      hi: "मनोरंजन, कला, विलासिता, सौंदर्य और रचनात्मक क्षेत्र। कई प्रतिभाएं विविध आय स्रोत बनाती हैं।",
    },
    familyLife: {
      en: "Romantic and devoted spouse. Marriage is filled with love and pleasure. Excellent parent who provides abundance. Social family life with many celebrations.",
      hi: "रोमांटिक और समर्पित जीवनसाथी। प्रेम और आनंद से भरा विवाह। उत्कृष्ट माता-पिता।",
    },
  },
  {
    nakshatra: 12,
    name: "Uttara Phalguni",
    nameHi: "उत्तरा फाल्गुनी",
    lord: "Sun",
    pada: 4,
    prediction: {
      en: "The star of patronage and giving, ruled by Aryaman. You are noble, helpful, and have a deep sense of social responsibility. A natural leader who is universally liked. You give generously and receive in return. Marriage and partnerships bring prosperity.",
      hi: "संरक्षण और दान का तारा, आर्यमन के अधीन। कुलीन, सहायक और गहरी सामाजिक जिम्मेदारी। सर्वत्र पसंद किए जाने वाले नेता।",
    },
    educationIncome: {
      en: "Government service, medicine, teaching, social work, and administration. Excellent prospects in public service. Steady, reliable income with growth over time.",
      hi: "सरकारी सेवा, चिकित्सा, शिक्षण, सामाजिक कार्य और प्रशासन। सार्वजनिक सेवा में उत्कृष्ट संभावनाएं।",
    },
    familyLife: {
      en: "Marriage brings stability and success. Deeply supportive of spouse's ambitions. Balanced home life with clear roles. Children are successful and socially minded.",
      hi: "विवाह से स्थिरता और सफलता। जीवनसाथी की महत्वाकांक्षाओं का गहरा समर्थन।",
    },
  },
  {
    nakshatra: 13,
    name: "Hasta",
    nameHi: "हस्त",
    lord: "Moon",
    pada: 4,
    prediction: {
      en: "The hand nakshatra symbolizes skill, craftsmanship, and the ability to manifest through one's hands. You are naturally skilled, witty, and have excellent healing abilities. Clever and resourceful, you can create something from nothing and inspire others.",
      hi: "हस्त नक्षत्र कुशलता, शिल्पकारी और हाथों के माध्यम से प्रकट करने की क्षमता का प्रतीक है। स्वाभाविक रूप से कुशल, चतुर और उत्कृष्ट उपचार क्षमताएं।",
    },
    educationIncome: {
      en: "Crafts, surgery, healing arts, astrology, massage therapy, and skilled trades. Excellent manual skills lead to varied career paths. Entrepreneurship with hands-on approach succeeds well.",
      hi: "शिल्प, शल्य चिकित्सा, उपचार कला, ज्योतिष, मसाज थेरेपी। उत्कृष्ट मैनुअल कौशल।",
    },
    familyLife: {
      en: "Helpful and practical family member. May marry more than once or have complex relationships. Nurturing parent with hands-on approach to raising children.",
      hi: "सहायक और व्यावहारिक परिवार के सदस्य। एक से अधिक विवाह या जटिल रिश्तों की संभावना।",
    },
  },
  {
    nakshatra: 14,
    name: "Chitra",
    nameHi: "चित्रा",
    lord: "Mars",
    pada: 4,
    prediction: {
      en: "The bright star of cosmic creation, ruled by Vishwakarma the divine architect. You have exceptional creative and aesthetic abilities with an eye for beauty and design. You build beautiful things — whether homes, art, relationships, or careers — with a perfectionist's touch.",
      hi: "विश्वकर्मा के अधीन ब्रह्मांडीय सृजन का चमकीला तारा। असाधारण रचनात्मक और सौंदर्य बोध। सुंदर चीजें बनाने की क्षमता।",
    },
    educationIncome: {
      en: "Architecture, interior design, fashion, jewelry, arts, IT, and engineering. High creative income. Building and construction industries are especially favorable.",
      hi: "वास्तुकला, इंटीरियर डिजाइन, फैशन, जेवरात, कला, आईटी और इंजीनियरिंग। उच्च रचनात्मक आय।",
    },
    familyLife: {
      en: "Creates a beautiful, well-designed home. May be perfectionist about environment. Partner must appreciate aesthetic sensibility. Children inherit creative talents.",
      hi: "सुंदर और सुव्यवस्थित घर बनाते हैं। वातावरण के बारे में परफेक्शनिस्ट। बच्चे रचनात्मक प्रतिभा विरासत में पाते हैं।",
    },
  },
  {
    nakshatra: 15,
    name: "Swati",
    nameHi: "स्वाती",
    lord: "Rahu",
    pada: 4,
    prediction: {
      en: "The independent star ruled by Vayu, god of wind. Like a young shoot that bends in the wind but doesn't break, you are flexible, resilient, and deeply independent. You thrive in trade, diplomacy, and social situations where your natural charm and negotiation skills shine.",
      hi: "वायु देव के अधीन स्वतंत्र तारा। वायु में झुकते हैं लेकिन टूटते नहीं — लचीले, मजबूत और गहरे स्वतंत्र। व्यापार, कूटनीति और सामाजिक स्थितियों में प्रतिभा।",
    },
    educationIncome: {
      en: "Business, trade, diplomacy, teaching, technology, and the arts. Strong business acumen. Multiple income streams through networking and trade.",
      hi: "व्यापार, कूटनीति, शिक्षण, प्रौद्योगिकी और कला। मजबूत व्यावसायिक बुद्धि। नेटवर्किंग से कई आय स्रोत।",
    },
    familyLife: {
      en: "Values independence in relationships. Marriage partner must be emotionally mature. Children may be free-spirited. Travel and change of environment is common in family life.",
      hi: "रिश्तों में स्वतंत्रता को महत्व देते हैं। जीवनसाथी भावनात्मक रूप से परिपक्व होना चाहिए।",
    },
  },
  {
    nakshatra: 16,
    name: "Vishakha",
    nameHi: "विशाखा",
    lord: "Jupiter",
    pada: 4,
    prediction: {
      en: "The star of purpose and determination, ruled by Indra and Agni. You are goal-oriented, persistent, and cannot rest until your objectives are achieved. You have a powerful competitive drive and the ability to focus intensely on what you want.",
      hi: "उद्देश्य और दृढ़ता का तारा, इंद्र और अग्नि के अधीन। लक्ष्योन्मुखी, दृढ़ और लक्ष्य प्राप्त होने तक विश्राम न करने वाले।",
    },
    educationIncome: {
      en: "Law, politics, administration, spiritual teaching, and competitive fields. Ambitious achiever in chosen field. Financial success through sustained effort and determination.",
      hi: "कानून, राजनीति, प्रशासन, आध्यात्मिक शिक्षण और प्रतिस्पर्धी क्षेत्र। चुने हुए क्षेत्र में महत्वाकांक्षी।",
    },
    familyLife: {
      en: "Devoted but may be too focused on goals. Late marriage or delayed commitment possible. Provides well for family financially. Strong-willed parent.",
      hi: "समर्पित लेकिन लक्ष्यों पर बहुत अधिक केंद्रित। देर से विवाह की संभावना। परिवार को आर्थिक रूप से अच्छी तरह प्रदान करते हैं।",
    },
  },
  {
    nakshatra: 17,
    name: "Anuradha",
    nameHi: "अनुराधा",
    lord: "Saturn",
    pada: 4,
    prediction: {
      en: "The star of success and friendship, ruled by Mitra the cosmic friend. You have exceptional social abilities and the capacity to create deep, lasting friendships. You succeed in foreign lands and your life often takes you far from your birthplace. Devotion and success are intertwined in your path.",
      hi: "सफलता और मित्रता का तारा, मित्र देव के अधीन। असाधारण सामाजिक क्षमताएं और गहरी, स्थायी मित्रता बनाने की क्षमता। विदेश में सफलता।",
    },
    educationIncome: {
      en: "Foreign travel, international business, research, medicine, and occult sciences. Success often comes in foreign places or through foreign connections. Spiritual pursuits bring fame.",
      hi: "विदेश यात्रा, अंतर्राष्ट्रीय व्यापार, अनुसंधान, चिकित्सा और गुप्त विज्ञान।",
    },
    familyLife: {
      en: "Deep friendships become like family. May live far from birth family. Marriage partner is often from different background or place. Profound emotional bonds with chosen family.",
      hi: "गहरी मित्रता परिवार जैसी हो जाती है। जन्म परिवार से दूर रह सकते हैं। जीवनसाथी अक्सर भिन्न पृष्ठभूमि का।",
    },
  },
  {
    nakshatra: 18,
    name: "Jyeshtha",
    nameHi: "ज्येष्ठा",
    lord: "Mercury",
    pada: 4,
    prediction: {
      en: "The eldest star ruled by Indra, the chief of gods. You have natural authority, protective instincts, and the ability to handle responsibility. You carry the weight of others willingly and are often the protector and provider in your family and community.",
      hi: "इंद्र के अधीन ज्येष्ठ तारा। स्वाभाविक अधिकार, सुरक्षात्मक प्रवृत्ति और जिम्मेदारी संभालने की क्षमता। परिवार और समुदाय में रक्षक।",
    },
    educationIncome: {
      en: "Management, administration, law enforcement, politics, and elder care. Natural authority brings leadership positions. Success through protecting and managing others.",
      hi: "प्रबंधन, प्रशासन, कानून, राजनीति और बुजुर्गों की देखभाल। स्वाभाविक अधिकार नेतृत्व पदों तक ले जाता है।",
    },
    familyLife: {
      en: "Eldest child responsibilities or protector role in family. Marriage may come late but is deeply committed. Strong parental authority. Extended family responsibilities.",
      hi: "परिवार में बड़े बच्चे की जिम्मेदारियां। विवाह देर से लेकिन गहरी प्रतिबद्धता। मजबूत माता-पिता का अधिकार।",
    },
  },
  {
    nakshatra: 19,
    name: "Mula",
    nameHi: "मूल",
    lord: "Ketu",
    pada: 4,
    prediction: {
      en: "The root nakshatra ruled by Nirriti, the goddess of dissolution. Your life involves deep transformations and getting to the root of things. You have a powerful investigative mind and are drawn to philosophy, spirituality, and exploring the foundations of existence.",
      hi: "निरृति देवी के अधीन मूल नक्षत्र। आपके जीवन में गहरे परिवर्तन और चीजों की जड़ तक पहुंचने की प्रवृत्ति। शक्तिशाली जांच-पड़ताल की मानसिकता।",
    },
    educationIncome: {
      en: "Medicine, research, spirituality, philosophy, and investigative work. Success often comes after initial struggles. Herb medicine, ayurveda, and traditional healing are favored.",
      hi: "चिकित्सा, अनुसंधान, अध्यात्म, दर्शन और जांच कार्य। प्रारंभिक संघर्षों के बाद सफलता।",
    },
    familyLife: {
      en: "Transformation in family life — events that completely change the course. May come from disrupted family background. Creates a new, stable foundation later in life.",
      hi: "पारिवारिक जीवन में परिवर्तन। बाधित पारिवारिक पृष्ठभूमि से हो सकते हैं। बाद में नई, स्थिर नींव बनाते हैं।",
    },
  },
  {
    nakshatra: 20,
    name: "Purva Ashadha",
    nameHi: "पूर्वाषाढ़ा",
    lord: "Venus",
    pada: 4,
    prediction: {
      en: "The invincible star ruled by Apas the water goddess. You have a naturally persuasive, purifying energy that helps others feel cleansed and revitalized in your presence. Competitive and persistent, you rarely give up. Your fan following grows naturally.",
      hi: "जल देवी अपस के अधीन अपराजित तारा। स्वाभाविक रूप से प्रेरक और शुद्ध करने वाली ऊर्जा। प्रतिस्पर्धी और दृढ़। प्रशंसकों का समूह स्वाभाविक रूप से बढ़ता है।",
    },
    educationIncome: {
      en: "Politics, media, sports, teaching, healing, and spiritual guidance. Natural public speaker. Fame and recognition come through persistence. Water-related industries are favorable.",
      hi: "राजनीति, मीडिया, खेल, शिक्षण और आध्यात्मिक मार्गदर्शन। प्राकृतिक वक्ता। दृढ़ता से प्रसिद्धि।",
    },
    familyLife: {
      en: "Loving family life with strong emotional bonds. May have influential extended family. Children inherit persuasive qualities. Marriage is passionate and enduring.",
      hi: "मजबूत भावनात्मक बंधन के साथ प्यारा पारिवारिक जीवन। बच्चे प्रेरक गुण विरासत में पाते हैं।",
    },
  },
  {
    nakshatra: 21,
    name: "Uttara Ashadha",
    nameHi: "उत्तराषाढ़ा",
    lord: "Sun",
    pada: 4,
    prediction: {
      en: "The final victory star ruled by the Vishvedevas, all the gods together. You have a noble, ethical character and the ability to achieve lasting success through righteousness. Your victories are hard-won but permanent. You stand for what is right even when it's difficult.",
      hi: "विश्वेदेव के अधीन अंतिम विजय का तारा। कुलीन, नैतिक चरित्र। धार्मिकता के माध्यम से स्थायी सफलता। कठिन लेकिन स्थायी जीत।",
    },
    educationIncome: {
      en: "Law, military, government, medicine, and ethical leadership. Success through sustained ethical practice. Late but permanent career success. Recognition and awards are common.",
      hi: "कानून, सैन्य, सरकार, चिकित्सा और नैतिक नेतृत्व। देर से लेकिन स्थायी करियर सफलता।",
    },
    familyLife: {
      en: "Deeply ethical family head. Marriage is serious and committed. May sacrifice personal happiness for family duty. Children grow up with strong values.",
      hi: "अत्यंत नैतिक परिवार के मुखिया। गंभीर और प्रतिबद्ध विवाह। बच्चे मजबूत मूल्यों के साथ बड़े होते हैं।",
    },
  },
  {
    nakshatra: 22,
    name: "Shravana",
    nameHi: "श्रवण",
    lord: "Moon",
    pada: 4,
    prediction: {
      en: "The listening star ruled by Vishnu. You have exceptional ability to learn by listening and the wisdom to transmit knowledge. Your path involves listening, learning, and teaching. You are deeply connected to spiritual knowledge and have a gift for connecting people.",
      hi: "विष्णु के अधीन श्रवण तारा। सुनकर सीखने की असाधारण क्षमता और ज्ञान को आगे बढ़ाने की बुद्धि। आध्यात्मिक ज्ञान से गहरा संबंध।",
    },
    educationIncome: {
      en: "Education, counseling, media, communication, spiritual teaching, and social work. Excellent in professions involving listening and communication. Success through knowledge dissemination.",
      hi: "शिक्षा, परामर्श, मीडिया, संचार और आध्यात्मिक शिक्षण। सुनने और संवाद में उत्कृष्ट।",
    },
    familyLife: {
      en: "Deeply attentive and present family member. Excellent listener as parent and partner. Creates a learning environment at home. Pilgrimage and travel with family are important.",
      hi: "गहरे ध्यानशील परिवार के सदस्य। माता-पिता और साथी के रूप में उत्कृष्ट श्रोता।",
    },
  },
  {
    nakshatra: 23,
    name: "Dhanishta",
    nameHi: "धनिष्ठा",
    lord: "Mars",
    pada: 4,
    prediction: {
      en: "You are multi-talented and expert in everything that you do. In any situation, you adjust yourself efficiently. You don't hurt anyone with mind, action, and words. Your mind is quite sharp and you always stay ready to learn something. Your enticing smile makes you quite attractive. You have a religious nature and always try to behave nicely with your abilities, character, and efforts. Being good in talking, you can get the love and support of people easily. You very well know how to honor and respect others. Everyone gets happiness and contentment around you. You are jolly, social, and friendly. Hence, you don't like to stay alone. You have interest in dance and music. When it comes to arguments, you are the best, which makes you good for politics and law. As you can keep things secret, you are perfect for intelligence department. No matter what your education is, but you are known for your wisdom. You are quite ambitious and dedicated.",
      hi: "आप बहु-प्रतिभाशाली और हर काम में विशेषज्ञ हैं। किसी भी परिस्थिति में कुशलतापूर्वक अनुकूलित होते हैं। मन, कर्म और वाणी से किसी को कष्ट नहीं देते। तेज दिमाग और सीखने के लिए सदैव तैयार। मुस्कान से आकर्षक। धार्मिक स्वभाव। सम्मान देना और पाना जानते हैं। आनंदमय, सामाजिक और मैत्रीपूर्ण। संगीत और नृत्य में रुचि।",
    },
    educationIncome: {
      en: "Favorable professions: historian, musician, dancer, stage performer, athlete, bank officer, scientist, computer-related works, soldier, poet, songwriter, singer, astrologer, spiritual Guru, surgeon, electronics, administration officer, engineering, hardware, and property work. Engineering and property business especially positive.",
      hi: "इतिहासकार, संगीतकार, नर्तक, मंच कलाकार, खिलाड़ी, बैंक अधिकारी, वैज्ञानिक, कंप्यूटर संबंधित कार्य, सैनिक, कवि, गीतकार, गायक, ज्योतिषी, आध्यात्मिक गुरु, शल्य चिकित्सक, इलेक्ट्रॉनिक्स और प्रशासन। इंजीनियरिंग और संपत्ति कार्य विशेष रूप से अनुकूल।",
    },
    familyLife: {
      en: "You will have special affection with siblings and married life will be happy. Life partner will prove to be lucky. You will get ample money as a successor, but you won't get much favor from your in-laws. Your spouse will be merciful and beneficent. Marriage will bring financial betterment to you.",
      hi: "भाई-बहनों से विशेष स्नेह और वैवाहिक जीवन सुखी। जीवनसाथी भाग्यशाली सिद्ध होगा। उत्तराधिकार में पर्याप्त धन मिलेगा लेकिन ससुराल से ज्यादा सहायता नहीं। विवाह से आर्थिक उन्नति।",
    },
  },
  {
    nakshatra: 24,
    name: "Shatabhisha",
    nameHi: "शतभिषा",
    lord: "Rahu",
    pada: 4,
    prediction: {
      en: "The hundred physicians nakshatra ruled by Varuna. You have exceptional healing abilities and a deep, scientific mind. You are drawn to mystery, research, and alternative healing. Solitary by nature, you need time alone to process and regenerate. Your insights can be ahead of their time.",
      hi: "वरुण देव के अधीन सौ चिकित्सकों का नक्षत्र। असाधारण उपचार क्षमताएं और वैज्ञानिक दिमाग। रहस्य, अनुसंधान और वैकल्पिक उपचार में रुचि।",
    },
    educationIncome: {
      en: "Medicine, research, technology, astrology, philosophy, and healing arts. Pioneer in chosen field. Success through unique approach and innovative thinking.",
      hi: "चिकित्सा, अनुसंधान, प्रौद्योगिकी, ज्योतिष, दर्शन और उपचार कला। अपने क्षेत्र में अग्रणी।",
    },
    familyLife: {
      en: "Needs significant personal space in relationships. Marriage partner must respect independence. Deep but not demonstrative love. Children may have unconventional paths.",
      hi: "रिश्तों में महत्वपूर्ण व्यक्तिगत स्थान की आवश्यकता। गहरा लेकिन अप्रदर्शनकारी प्रेम।",
    },
  },
  {
    nakshatra: 25,
    name: "Purva Bhadrapada",
    nameHi: "पूर्वा भाद्रपदा",
    lord: "Jupiter",
    pada: 4,
    prediction: {
      en: "The two-faced star ruled by Aja Ekapada. You have intensity, passion, and the ability to transform through extreme experiences. You can be both spiritual and worldly at different times in life. Your passion and dedication to chosen causes are unparalleled.",
      hi: "अज एकपाद के अधीन दो चेहरों वाला तारा। तीव्रता, जुनून और चरम अनुभवों से परिवर्तन की क्षमता। आध्यात्मिक और सांसारिक दोनों हो सकते हैं।",
    },
    educationIncome: {
      en: "Finance, occult sciences, research, medicine, and transformative arts. Intense focus brings extraordinary results. Wealth through speculation or investment if well-directed.",
      hi: "वित्त, गुप्त विज्ञान, अनुसंधान, चिकित्सा और परिवर्तनकारी कला। तीव्र एकाग्रता असाधारण परिणाम लाती है।",
    },
    familyLife: {
      en: "Passionate and extreme in relationships. May experience dramatic relationship events. Deep love but potential for conflict. Committed once settled. Intense parent.",
      hi: "रिश्तों में जोशीले और चरम। नाटकीय रिश्ते के अनुभव। गहरा प्रेम लेकिन संघर्ष की संभावना।",
    },
  },
  {
    nakshatra: 26,
    name: "Uttara Bhadrapada",
    nameHi: "उत्तरा भाद्रपदा",
    lord: "Saturn",
    pada: 4,
    prediction: {
      en: "The serpent of the deep, ruled by Ahir Budhnya. You have profound depth, wisdom, and the ability to stabilize others. Like a serpent coiled around deep wisdom, you carry ancient knowledge. Patient, steady, and deeply spiritual, your life ripens slowly but beautifully.",
      hi: "अहिर बुध्न्य के अधीन गहराई का सर्प। गहराई, बुद्धि और दूसरों को स्थिर करने की क्षमता। प्राचीन ज्ञान का वाहक। धैर्यवान, स्थिर और गहरे आध्यात्मिक।",
    },
    educationIncome: {
      en: "Spiritual teaching, counseling, social work, medicine, and deep research. Success through service and wisdom. Wealth accumulates steadily over time. Non-profit and charitable work often resonates.",
      hi: "आध्यात्मिक शिक्षण, परामर्श, सामाजिक कार्य, चिकित्सा और गहरा शोध। सेवा और बुद्धि से सफलता।",
    },
    familyLife: {
      en: "Patient and deeply supportive family member. Marriage is committed and grows deeper with time. Excellent guide to children. Extended family respect comes naturally.",
      hi: "धैर्यवान और गहरे सहायक परिवार के सदस्य। विवाह समर्पित और समय के साथ गहरा होता है।",
    },
  },
  {
    nakshatra: 27,
    name: "Revati",
    nameHi: "रेवती",
    lord: "Mercury",
    pada: 4,
    prediction: {
      en: "The nourishing star, the last nakshatra completing the zodiacal cycle. Blessed by Pushan the nourisher, you have an innate ability to guide, protect, and shepherd others. You are deeply compassionate, artistic, and spiritually evolved. You carry the wisdom of completion and new beginnings simultaneously.",
      hi: "पोषण करने वाला तारा, राशिचक्र चक्र को पूरा करने वाला अंतिम नक्षत्र। पूषण के आशीर्वाद से, दूसरों का मार्गदर्शन और रक्षा करने की सहज क्षमता। गहरी करुणा और कलात्मकता।",
    },
    educationIncome: {
      en: "Arts, music, travel, spirituality, counseling, and social service. Natural artistic talent brings recognition. Success through guiding and helping others. International travel and work are favorable.",
      hi: "कला, संगीत, यात्रा, अध्यात्म, परामर्श और सामाजिक सेवा। प्राकृतिक कलात्मक प्रतिभा। अंतर्राष्ट्रीय यात्रा और कार्य अनुकूल।",
    },
    familyLife: {
      en: "Deeply nurturing parent and devoted partner. Creates a warm, spiritual home environment. Family may include people from different backgrounds. Natural protector of weaker family members.",
      hi: "गहरे पोषणकारी माता-पिता और समर्पित साथी। गर्म, आध्यात्मिक घरेलू वातावरण। परिवार के कमजोर सदस्यों के प्राकृतिक रक्षक।",
    },
  },
];
