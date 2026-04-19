// Life Predictions Data for all 9 Mulank values

export interface LifePrediction {
  character: { en: string; hi: string };
  happinessAndFulfillment: { en: string; hi: string };
  lifeStyle: { en: string; hi: string };
  career: { en: string; hi: string };
  occupation: { en: string; hi: string };
  health: { en: string; hi: string };
  hobbies: { en: string; hi: string };
  loveMatters: { en: string; hi: string };
  finance: { en: string; hi: string };
  education: { en: string; hi: string };
}

export const LIFE_PREDICTIONS: Record<number, LifePrediction> = {
  1: {
    character: {
      en: "Number 1 individuals are natural-born leaders with strong willpower and originality. Ruled by the Sun, they radiate confidence, authority, and independence. They are determined achievers who often pioneer new paths. Their directness and courage are admirable, though they must guard against ego and stubbornness.",
      hi: "अंक 1 के जातक जन्मजात नेता होते हैं, मजबूत इच्छाशक्ति और मौलिकता के साथ। सूर्य द्वारा शासित, वे आत्मविश्वास, अधिकार और स्वतंत्रता प्रसारित करते हैं। दृढ़ निश्चयी और नए मार्ग खोलने वाले।",
    },
    happinessAndFulfillment: {
      en: "Happiness comes through achievement, recognition, and independence. They find fulfillment when leading projects or being acknowledged as experts. Creative expression and being in control of their destiny are key sources of joy.",
      hi: "उपलब्धि, मान्यता और स्वतंत्रता से खुशी मिलती है। परियोजनाओं का नेतृत्व करने या विशेषज्ञ के रूप में स्वीकृति मिलने से संतुष्टि। रचनात्मक अभिव्यक्ति और अपनी नियति पर नियंत्रण प्रमुख आनंद स्रोत।",
    },
    lifeStyle: {
      en: "Number 1 individuals prefer an active, dynamic lifestyle. They love being in charge, whether at work or at home. They often work long hours but also know how to enjoy the rewards. They prefer quality over quantity in all aspects of life.",
      hi: "सक्रिय और गतिशील जीवनशैली। काम हो या घर, नियंत्रण में रहना पसंद। अक्सर लंबे घंटे काम करते हैं लेकिन पुरस्कारों का आनंद भी लेते हैं। हर पहलू में गुणवत्ता को मात्रा से अधिक पसंद करते हैं।",
    },
    career: {
      en: "Best suited for leadership and independent roles. They excel as CEOs, entrepreneurs, managers, military officers, and in any position that rewards initiative and original thinking. They struggle under micromanagement.",
      hi: "नेतृत्व और स्वतंत्र भूमिकाओं के लिए सबसे उपयुक्त। CEO, उद्यमी, प्रबंधक, सैन्य अधिकारी के रूप में उत्कृष्ट। सूक्ष्म प्रबंधन के तहत संघर्ष करते हैं।",
    },
    occupation: {
      en: "Politics, government, administration, military, entrepreneurship, medicine, engineering, finance, and teaching. Any field where leadership and original thinking are rewarded.",
      hi: "राजनीति, सरकार, प्रशासन, सैन्य, उद्यमिता, चिकित्सा, इंजीनियरिंग, वित्त और शिक्षण।",
    },
    health: {
      en: "Prone to heart-related issues, high blood pressure, headaches, and eye problems due to Sun's influence. Stress and overwork are major health concerns. Regular exercise, reduced stress, and adequate rest are crucial.",
      hi: "सूर्य के प्रभाव से हृदय संबंधी समस्याएं, उच्च रक्तचाप, सिरदर्द और आंखों की समस्याएं। तनाव और अत्यधिक काम प्रमुख स्वास्थ्य चिंताएं।",
    },
    hobbies: {
      en: "Leadership activities, sports (especially team captain roles), creative writing, collecting rare items, physical fitness, travel to new destinations, and learning new skills.",
      hi: "नेतृत्व गतिविधियां, खेल, रचनात्मक लेखन, दुर्लभ वस्तुएं एकत्र करना, शारीरिक फिटनेस और नई मंजिलों की यात्रा।",
    },
    loveMatters: {
      en: "Passionate and devoted in love but need a partner who respects their independence. They can be domineering and need to develop sensitivity. Best matches are with numbers 3, 5, and 9. They are loyal once committed.",
      hi: "प्रेम में जोशीले और समर्पित लेकिन स्वतंत्रता का सम्मान करने वाले साथी चाहिए। अंक 3, 5 और 9 के साथ सर्वोत्तम मेल। एक बार प्रतिबद्ध होने पर वफादार।",
    },
    finance: {
      en: "Strong earning potential through leadership and entrepreneurship. Prone to overspending on status symbols. Need to develop financial discipline and long-term investment planning. Success in gold, stocks, and leadership-oriented businesses.",
      hi: "नेतृत्व और उद्यमिता से मजबूत कमाई क्षमता। स्थिति प्रतीकों पर अत्यधिक खर्च की प्रवृत्ति। वित्तीय अनुशासन और दीर्घकालिक निवेश योजना जरूरी।",
    },
    education: {
      en: "Excellent academic achievers when interested in a subject. Leadership roles in educational institutions. Best in fields that require initiative and original thinking — engineering, management, law, and medicine.",
      hi: "रुचि के विषय में उत्कृष्ट शैक्षणिक प्रदर्शन। शैक्षणिक संस्थानों में नेतृत्व भूमिकाएं। इंजीनियरिंग, प्रबंधन, कानून और चिकित्सा में सर्वश्रेष्ठ।",
    },
  },
  2: {
    character: {
      en: "Number 2 individuals are sensitive, intuitive, and cooperative. Ruled by the Moon, they are deeply empathetic and attuned to the emotional currents around them. They excel in partnerships and diplomatic situations. Their gentleness and artistic sensibility are their greatest gifts.",
      hi: "अंक 2 के जातक संवेदनशील, सहज और सहयोगी होते हैं। चंद्रमा द्वारा शासित, वे गहरे सहानुभूतिपूर्ण और अपने आसपास की भावनात्मक धाराओं से जुड़े होते हैं।",
    },
    happinessAndFulfillment: {
      en: "Happiness comes through harmonious relationships, creative expression, and feeling appreciated. They thrive in environments of beauty and peace. Emotional security and belonging are paramount to their wellbeing.",
      hi: "सामंजस्यपूर्ण रिश्तों, रचनात्मक अभिव्यक्ति और सराहना से खुशी मिलती है। सुंदरता और शांति के वातावरण में फलते-फूलते हैं।",
    },
    lifeStyle: {
      en: "A gentle, aesthetic lifestyle with attention to beauty, harmony, and comfort. They prefer cooperative environments over competitive ones. Regular periods of quiet and reflection are essential to their balance.",
      hi: "सुंदरता, सद्भाव और आराम पर ध्यान देने वाली कोमल जीवनशैली। प्रतिस्पर्धी के बजाय सहयोगी वातावरण पसंद। शांत चिंतन के नियमित क्षण आवश्यक।",
    },
    career: {
      en: "Excel in supportive, creative, and collaborative roles. Counselors, therapists, artists, musicians, diplomats, nurses, and teachers. They bring harmony to any workplace.",
      hi: "सहायक, रचनात्मक और सहयोगी भूमिकाओं में उत्कृष्ट। परामर्शदाता, चिकित्सक, कलाकार, संगीतकार, राजनयिक, नर्स और शिक्षक।",
    },
    occupation: {
      en: "Art, music, diplomacy, social work, psychology, writing, fashion, interior design, hospitality, and healthcare.",
      hi: "कला, संगीत, कूटनीति, सामाजिक कार्य, मनोविज्ञान, लेखन, फैशन, इंटीरियर डिजाइन और स्वास्थ्य सेवा।",
    },
    health: {
      en: "Prone to digestive issues, fluid imbalances, emotional stress affecting physical health, sleep disturbances, and hormonal fluctuations. Self-care rituals, moon-gazing, and emotional support are vital.",
      hi: "पाचन समस्याएं, तरल असंतुलन, भावनात्मक तनाव से शारीरिक प्रभाव। स्व-देखभाल अनुष्ठान और भावनात्मक समर्थन महत्वपूर्ण।",
    },
    hobbies: {
      en: "Music, poetry, painting, dancing, gardening, cooking for loved ones, collecting beautiful objects, and water-related activities.",
      hi: "संगीत, कविता, चित्रकला, नृत्य, बागवानी, प्रियजनों के लिए खाना पकाना और जल संबंधी गतिविधियां।",
    },
    loveMatters: {
      en: "Deeply romantic and devoted. Need emotional security and understanding in relationships. Can be overly dependent or clingy. Best matches with numbers 1, 7, and 4. They give everything in love.",
      hi: "गहरे रोमांटिक और समर्पित। रिश्तों में भावनात्मक सुरक्षा और समझ जरूरी। अंक 1, 7 और 4 के साथ सर्वोत्तम मेल।",
    },
    finance: {
      en: "Moderate financial outlook. Excel when partnering with financially-minded individuals. Prone to emotional spending. Long-term security through savings and property is recommended.",
      hi: "मध्यम वित्तीय दृष्टिकोण। वित्त-minded व्यक्तियों के साथ साझेदारी में उत्कृष्ट। बचत और संपत्ति से दीर्घकालिक सुरक्षा।",
    },
    education: {
      en: "Flourish in arts, humanities, psychology, and social sciences. Sensitive to teaching methods — need encouraging, supportive teachers. Creative writing and music programs are natural fits.",
      hi: "कला, मानविकी, मनोविज्ञान और सामाजिक विज्ञान में उत्कर्ष। प्रोत्साहक और सहायक शिक्षकों की जरूरत। रचनात्मक लेखन और संगीत कार्यक्रम प्राकृतिक फिट।",
    },
  },
  3: {
    character: {
      en: "Number 3 individuals are creative, optimistic, and joyful. Ruled by Jupiter, they are naturally gifted communicators and entertainers. Their enthusiasm is contagious and they uplift everyone around them. They have a childlike wonder that never fades and a talent for making life beautiful.",
      hi: "अंक 3 के जातक रचनात्मक, आशावादी और आनंदमय होते हैं। गुरु द्वारा शासित, वे स्वाभाविक रूप से प्रतिभाशाली संचारकर्ता और मनोरंजनकर्ता हैं।",
    },
    happinessAndFulfillment: {
      en: "Happiness comes through creative expression, social connection, and sharing their gifts with the world. They thrive when making people laugh, creating art, or teaching others. Recognition of their talents brings deep satisfaction.",
      hi: "रचनात्मक अभिव्यक्ति, सामाजिक संपर्क और उपहार साझा करने से खुशी। लोगों को हंसाने, कला बनाने या दूसरों को पढ़ाने में फलते-फूलते हैं।",
    },
    lifeStyle: {
      en: "Social, colorful, and active. They love gatherings, celebrations, travel, and exploring new experiences. Their home is often filled with beautiful things, music, and laughter. They resist routine and need variety.",
      hi: "सामाजिक, रंगीन और सक्रिय। मेलजोल, उत्सव, यात्रा और नए अनुभव पसंद। घर सुंदर चीजों, संगीत और हंसी से भरा। दिनचर्या का विरोध।",
    },
    career: {
      en: "Excel in creative, communicative, and entertaining professions. Writers, actors, teachers, priests, lawyers, financial advisors, and public speakers. Jupiter's blessings ensure success in educational and spiritual fields.",
      hi: "रचनात्मक, संचारात्मक और मनोरंजन व्यवसायों में उत्कृष्ट। लेखक, अभिनेता, शिक्षक, पुजारी, वकील और सार्वजनिक वक्ता।",
    },
    occupation: {
      en: "Teaching, writing, arts, entertainment, law, religion, finance, travel, communication, and spiritual guidance.",
      hi: "शिक्षण, लेखन, कला, मनोरंजन, कानून, धर्म, वित्त, यात्रा, संचार और आध्यात्मिक मार्गदर्शन।",
    },
    health: {
      en: "Prone to skin issues, liver problems, overindulgence-related conditions, and nervous exhaustion from scattered energy. Regular rhythm, limiting excess, and outdoor activities support health.",
      hi: "त्वचा समस्याएं, यकृत समस्याएं और बिखरी ऊर्जा से तंत्रिका थकान। नियमित लय और बाहरी गतिविधियां स्वास्थ्य का समर्थन करती हैं।",
    },
    hobbies: {
      en: "Writing, storytelling, acting, painting, music, traveling, social events, cooking, fashion, and spiritual studies.",
      hi: "लेखन, कहानी सुनाना, अभिनय, चित्रकला, संगीत, यात्रा, सामाजिक कार्यक्रम और आध्यात्मिक अध्ययन।",
    },
    loveMatters: {
      en: "Warm, generous, and playful in love. Need a partner who appreciates their exuberance and freedom. Can scatter energy across many interests. Best matches with numbers 1, 6, and 9.",
      hi: "प्रेम में गर्म, उदार और खिलंदड़। उत्साह और स्वतंत्रता की सराहना करने वाले साथी की जरूरत। अंक 1, 6 और 9 के साथ सर्वोत्तम मेल।",
    },
    finance: {
      en: "Good earning potential but prone to overspending on pleasures. Jupiter's blessings provide financial luck and protection. Speculative investments can be successful. Regular savings habit needs cultivation.",
      hi: "अच्छी कमाई क्षमता लेकिन आनंद पर अत्यधिक खर्च की प्रवृत्ति। गुरु के आशीर्वाद से वित्तीय भाग्य। बचत की आदत विकसित करना जरूरी।",
    },
    education: {
      en: "Bright, enthusiastic learner who excels in subjects they love. Humanities, law, arts, and communication studies are natural fits. May scatter across too many interests without focus.",
      hi: "उज्ज्वल, उत्साही छात्र जो पसंदीदा विषयों में उत्कृष्ट। मानविकी, कानून, कला और संचार अध्ययन प्राकृतिक फिट।",
    },
  },
  4: {
    character: {
      en: "Number 4 individuals are disciplined, practical, and hardworking. Ruled by Rahu, they are unconventional thinkers who bring unique perspectives to traditional structures. They are reliable, trustworthy, and build lasting foundations. Their dedication to work is unmatched.",
      hi: "अंक 4 के जातक अनुशासित, व्यावहारिक और परिश्रमी होते हैं। राहु द्वारा शासित, वे अपरंपरागत विचारक हैं जो पारंपरिक संरचनाओं में अनोखे दृष्टिकोण लाते हैं।",
    },
    happinessAndFulfillment: {
      en: "Happiness comes through completing meaningful work, achieving tangible results, and building something lasting. Security, stability, and recognition for their tireless efforts are key to their fulfillment.",
      hi: "सार्थक कार्य पूरा करने, मूर्त परिणाम प्राप्त करने और कुछ स्थायी बनाने से खुशी। सुरक्षा, स्थिरता और अथक प्रयासों की पहचान संतुष्टि की कुंजी।",
    },
    lifeStyle: {
      en: "Structured, methodical, and focused. They prefer routines and schedules. Their homes are organized and practical. They value hard work above all and are often seen as the most dependable person in any group.",
      hi: "संरचित, व्यवस्थित और केंद्रित। दिनचर्या और कार्यक्रम पसंद। घर व्यवस्थित और व्यावहारिक। कड़ी मेहनत को सर्वोपरि महत्व देते हैं।",
    },
    career: {
      en: "Excel in technical, organizational, and systematic roles. Engineers, architects, accountants, managers, builders, scientists, researchers, and IT professionals. Their meticulousness ensures quality results.",
      hi: "तकनीकी, संगठनात्मक और व्यवस्थित भूमिकाओं में उत्कृष्ट। इंजीनियर, वास्तुकार, लेखाकार, प्रबंधक और आईटी पेशेवर।",
    },
    occupation: {
      en: "Engineering, architecture, accounting, real estate, IT, construction, management, research, and administration.",
      hi: "इंजीनियरिंग, वास्तुकला, लेखा, रियल एस्टेट, आईटी, निर्माण, प्रबंधन और अनुसंधान।",
    },
    health: {
      en: "Prone to back problems, bone issues, joint pain, and stress-related conditions from overwork. Regular physical movement, stretching, and work-life balance are important. Rahu's influence can bring sudden health changes.",
      hi: "अत्यधिक काम से पीठ समस्याएं, हड्डी और जोड़ों में दर्द। नियमित शारीरिक गतिविधि और कार्य-जीवन संतुलन महत्वपूर्ण।",
    },
    hobbies: {
      en: "Building and crafting things, mechanical work, puzzles, systematic sports, gardening, collecting and organizing, and reading technical or historical material.",
      hi: "चीजें बनाना और बनाना, यांत्रिक कार्य, पहेलियां, बागवानी, संग्रह और व्यवस्था, और तकनीकी या ऐतिहासिक सामग्री पढ़ना।",
    },
    loveMatters: {
      en: "Loyal and steady in relationships but may struggle to express emotions. Need a partner who appreciates their practical demonstrations of love. Can be rigid. Best matches with numbers 1, 7, and 8.",
      hi: "रिश्तों में वफादार और स्थिर लेकिन भावनाएं व्यक्त करने में संघर्ष। अंक 1, 7 और 8 के साथ सर्वोत्तम मेल।",
    },
    finance: {
      en: "Excellent financial planner and saver. Prefers secure, long-term investments over speculation. May face unexpected financial changes due to Rahu. Property and fixed assets are favorable investments.",
      hi: "उत्कृष्ट वित्तीय योजनाकार और बचतकर्ता। सट्टे के बजाय सुरक्षित, दीर्घकालिक निवेश पसंद। संपत्ति और स्थिर संपत्ति अनुकूल निवेश।",
    },
    education: {
      en: "Diligent student who excels through hard work and systematic study. Technical and scientific fields are ideal. May not perform well in unstructured or highly creative academic environments.",
      hi: "परिश्रमी छात्र जो कठिन परिश्रम और व्यवस्थित अध्ययन से उत्कृष्ट। तकनीकी और वैज्ञानिक क्षेत्र आदर्श।",
    },
  },
  5: {
    character: {
      en: "Number 5 individuals are versatile, communicative, and freedom-loving. Ruled by Mercury, they are quick-thinking, adaptable, and multi-talented. Their energy is mercurial and restless, always seeking new experiences and knowledge. They are the great communicators of numerology.",
      hi: "अंक 5 के जातक बहुमुखी, संचारात्मक और स्वतंत्रता-प्रेमी होते हैं। बुध द्वारा शासित, वे शीघ्र-विचारक, अनुकूलनशील और बहु-प्रतिभाशाली हैं।",
    },
    happinessAndFulfillment: {
      en: "Happiness comes through variety, travel, learning new things, and experiencing freedom. They thrive in dynamic, changing environments. Intellectual stimulation and social interaction are vital to their wellbeing.",
      hi: "विविधता, यात्रा, नई चीजें सीखने और स्वतंत्रता के अनुभव से खुशी। गतिशील, बदलते परिवेश में फलते-फूलते हैं।",
    },
    lifeStyle: {
      en: "Dynamic, varied, and socially active. They rarely stay in one place for long and prefer a life rich with travel and new experiences. They are typically well-connected and know people from all walks of life.",
      hi: "गतिशील, विविध और सामाजिक रूप से सक्रिय। एक जगह ज्यादा समय नहीं रुकते। यात्रा और नए अनुभवों से भरपूर जीवन पसंद।",
    },
    career: {
      en: "Excel in communication, media, sales, travel, and fields requiring versatility. Journalists, salespeople, teachers, travel agents, translators, stockbrokers, and entertainers. They thrive on change.",
      hi: "संचार, मीडिया, बिक्री, यात्रा और बहुमुखी प्रतिभा की जरूरत वाले क्षेत्रों में उत्कृष्ट। पत्रकार, बिक्री प्रतिनिधि, शिक्षक और अनुवादक।",
    },
    occupation: {
      en: "Media, communications, sales, travel industry, advertising, technology, stock trading, writing, and multi-domain entrepreneurship.",
      hi: "मीडिया, संचार, बिक्री, यात्रा उद्योग, विज्ञापन, प्रौद्योगिकी, शेयर ट्रेडिंग और बहु-डोमेन उद्यमिता।",
    },
    health: {
      en: "Prone to nervous disorders, anxiety, respiratory issues, and conditions linked to overindulgence in sensory pleasures. Regular grounding practices, structured routine, and breath work are important.",
      hi: "तंत्रिका संबंधी विकार, चिंता, श्वसन समस्याएं। नियमित ग्राउंडिंग अभ्यास, संरचित दिनचर्या और श्वास कार्य महत्वपूर्ण।",
    },
    hobbies: {
      en: "Travel, learning languages, reading, writing, social media, networking, puzzles, sports, games, and sampling different cuisines.",
      hi: "यात्रा, भाषाएं सीखना, पढ़ना, लेखन, सोशल मीडिया, नेटवर्किंग और विभिन्न व्यंजनों का आनंद।",
    },
    loveMatters: {
      en: "Charming and fun in relationships but may fear commitment. Need a partner who keeps up with their pace and respects their independence. Best matches with numbers 1, 6, and 9. Fidelity requires conscious effort.",
      hi: "रिश्तों में आकर्षक और मजेदार लेकिन प्रतिबद्धता से डर सकते हैं। अंक 1, 6 और 9 के साथ सर्वोत्तम मेल।",
    },
    finance: {
      en: "Excellent at earning through multiple channels but may struggle to hold onto money. Prone to impulsive financial decisions. Savings and financial planning need conscious cultivation.",
      hi: "कई चैनलों से कमाई में उत्कृष्ट लेकिन पैसे रोकने में संघर्ष। आवेगी वित्तीय निर्णयों की प्रवृत्ति। बचत जरूरी।",
    },
    education: {
      en: "Quick learner who picks up subjects rapidly but may lose interest without sufficient stimulation. Excels in subjects involving communication, analysis, and creativity. Language studies are especially favored.",
      hi: "त्वरित सीखने वाले जो विषय तेजी से समझते हैं लेकिन पर्याप्त उत्तेजना के बिना रुचि खो सकते हैं।",
    },
  },
  6: {
    character: {
      en: "Number 6 individuals are nurturing, responsible, and harmony-loving. Ruled by Venus, they are natural caregivers with a deep sense of beauty and justice. They put family and community first and are often the emotional backbone of their relationships.",
      hi: "अंक 6 के जातक पोषणकारी, जिम्मेदार और सद्भाव-प्रेमी होते हैं। शुक्र द्वारा शासित, वे सुंदरता और न्याय की गहरी भावना वाले प्राकृतिक देखभालकर्ता हैं।",
    },
    happinessAndFulfillment: {
      en: "Happiness comes through loving relationships, a beautiful home, creative expression, and being needed. They find deep fulfillment in nurturing others and creating harmony in their environment.",
      hi: "प्यारे रिश्तों, सुंदर घर, रचनात्मक अभिव्यक्ति और जरूरत होने से खुशी। दूसरों का पोषण करने और वातावरण में सद्भाव बनाने में गहरी संतुष्टि।",
    },
    lifeStyle: {
      en: "Home-centered, beautiful, and harmonious. They invest time and energy in making their living space beautiful. Social and family gatherings are central to their life. They are the perfect host and the go-to person for advice.",
      hi: "घर-केंद्रित, सुंदर और सामंजस्यपूर्ण। रहने की जगह को सुंदर बनाने में समय और ऊर्जा लगाते हैं। सामाजिक और पारिवारिक मेलजोल जीवन के केंद्र में।",
    },
    career: {
      en: "Excel in caregiving, artistic, and service professions. Teachers, doctors, counselors, social workers, artists, interior designers, and hospitality professionals. They create healing environments.",
      hi: "देखभाल, कलात्मक और सेवा व्यवसायों में उत्कृष्ट। शिक्षक, डॉक्टर, परामर्शदाता, कलाकार और इंटीरियर डिजाइनर।",
    },
    occupation: {
      en: "Healthcare, education, arts, beauty, interior design, social work, counseling, hospitality, legal advisory, and family-related businesses.",
      hi: "स्वास्थ्य सेवा, शिक्षा, कला, सौंदर्य, इंटीरियर डिजाइन, सामाजिक कार्य, परामर्श और पारिवारिक व्यवसाय।",
    },
    health: {
      en: "Prone to heart issues, blood pressure, skin conditions, and weight challenges due to Venus. May neglect their own health while caring for others. Self-care is essential, not optional.",
      hi: "हृदय समस्याएं, रक्तचाप, त्वचा विकार और वजन चुनौतियां। दूसरों की देखभाल करते हुए अपना स्वास्थ्य नजरअंदाज कर सकते हैं। स्व-देखभाल आवश्यक।",
    },
    hobbies: {
      en: "Cooking, interior decorating, music, painting, flower arranging, community service, yoga, meditation, and spending time with family.",
      hi: "खाना पकाना, इंटीरियर सजावट, संगीत, चित्रकला, फूलों की सजावट, सामुदायिक सेवा और परिवार के साथ समय।",
    },
    loveMatters: {
      en: "Deeply devoted and romantic. May give too much in relationships and need to learn boundaries. Creates a beautiful, loving home environment. Best matches with numbers 3, 9, and 2.",
      hi: "गहरे समर्पित और रोमांटिक। रिश्तों में बहुत अधिक दे सकते हैं। सुंदर, प्रेमपूर्ण घरेलू वातावरण। अंक 3, 9 और 2 के साथ सर्वोत्तम मेल।",
    },
    finance: {
      en: "Good financial potential through their service and creative abilities. May overspend on home and family. Venus blesses with prosperity when their gifts are shared generously. Real estate and beauty industries are favorable.",
      hi: "सेवा और रचनात्मक क्षमताओं से अच्छी वित्तीय क्षमता। घर और परिवार पर अत्यधिक खर्च। रियल एस्टेट और सौंदर्य उद्योग अनुकूल।",
    },
    education: {
      en: "Excel in arts, humanities, social sciences, and education. Natural teachers who love to share knowledge. Medical and health sciences are also strong paths.",
      hi: "कला, मानविकी, सामाजिक विज्ञान और शिक्षा में उत्कृष्ट। ज्ञान साझा करने वाले प्राकृतिक शिक्षक। चिकित्सा और स्वास्थ्य विज्ञान भी मजबूत मार्ग।",
    },
  },
  7: {
    character: {
      en: "Number 7 individuals are analytical, introspective, and spiritually inclined. Ruled by Ketu, they are seekers of deeper truth and hidden knowledge. They have an aura of mystery and wisdom that draws others to them. They need regular solitude to recharge and reflect.",
      hi: "अंक 7 के जातक विश्लेषणात्मक, आत्म-चिंतनशील और आध्यात्मिक रूप से झुके होते हैं। केतु द्वारा शासित, वे गहरी सच्चाई और छिपे ज्ञान के खोजी हैं।",
    },
    happinessAndFulfillment: {
      en: "Happiness comes through knowledge, spiritual understanding, and solitary contemplation. They find fulfillment in uncovering hidden truths, mastering a skill deeply, or achieving spiritual insight.",
      hi: "ज्ञान, आध्यात्मिक समझ और एकांत चिंतन से खुशी। छिपी सच्चाइयों को उजागर करने, किसी कौशल में गहरी महारत या आध्यात्मिक अंतर्दृष्टि से संतुष्टि।",
    },
    lifeStyle: {
      en: "Quiet, contemplative, and intellectually oriented. They prefer fewer but deeper relationships. Their home is often their sanctuary — filled with books and symbols of wisdom. Regular time in nature or meditation is essential.",
      hi: "शांत, चिंतनशील और बौद्धिक। कम लेकिन गहरे रिश्ते पसंद। घर अक्सर उनका अभयारण्य। प्रकृति या ध्यान में नियमित समय आवश्यक।",
    },
    career: {
      en: "Excel in research, spirituality, philosophy, academia, and investigative fields. Scientists, researchers, astrologers, mystics, writers, and philosophers are natural paths. They need autonomy and depth.",
      hi: "शोध, अध्यात्म, दर्शन, शिक्षा और जांच क्षेत्रों में उत्कृष्ट। वैज्ञानिक, शोधकर्ता, ज्योतिषी, रहस्यवादी और दार्शनिक।",
    },
    occupation: {
      en: "Research, astrology, philosophy, writing, spirituality, medicine (especially alternative), psychology, IT, and academia.",
      hi: "शोध, ज्योतिष, दर्शन, लेखन, अध्यात्म, चिकित्सा, मनोविज्ञान, आईटी और शिक्षा।",
    },
    health: {
      en: "Prone to skin conditions, joint issues, mysterious or difficult-to-diagnose ailments, and isolation-related mental health challenges. Regular social interaction and grounding in physical activity help.",
      hi: "त्वचा विकार, जोड़ों की समस्याएं, रहस्यमय बीमारियां। नियमित सामाजिक संपर्क और शारीरिक गतिविधि में ग्राउंडिंग मदद करती है।",
    },
    hobbies: {
      en: "Reading, research, meditation, astrology, music (especially classical), writing, nature walks, chess, and spiritual practices.",
      hi: "पढ़ना, शोध, ध्यान, ज्योतिष, संगीत, लेखन, प्रकृति सैर, शतरंज और आध्यात्मिक अभ्यास।",
    },
    loveMatters: {
      en: "Deep but hard to fully know. May struggle to open emotionally. Need a partner who respects their need for solitude and intellectual depth. Best matches with numbers 2, 4, and 1.",
      hi: "गहरे लेकिन पूरी तरह जानना मुश्किल। भावनात्मक रूप से खुलने में संघर्ष। अंक 2, 4 और 1 के साथ सर्वोत्तम मेल।",
    },
    finance: {
      en: "Moderate financial drive but capable of generating wealth through knowledge and specialized skills. May be careless with practical financial matters. Investments in technology and research are favorable.",
      hi: "मध्यम वित्तीय ड्राइव लेकिन ज्ञान और विशेष कौशल से धन उत्पन्न करने में सक्षम। प्रौद्योगिकी और शोध में निवेश अनुकूल।",
    },
    education: {
      en: "Brilliant in academia when engaged in subjects that interest them deeply. Prefer depth over breadth. Graduate studies and specialized research are natural fits.",
      hi: "गहरी रुचि वाले विषयों में शिक्षा में प्रतिभाशाली। गहराई को चौड़ाई से अधिक पसंद। स्नातक अध्ययन और विशेष शोध प्राकृतिक फिट।",
    },
  },
  8: {
    character: {
      en: "Number 8 individuals are powerful, ambitious, and karmic. Ruled by Saturn, they understand the laws of cause and effect deeply. They are born to handle material power and often face both great challenges and great rewards in life. Their strength and endurance are legendary.",
      hi: "अंक 8 के जातक शक्तिशाली, महत्वाकांक्षी और कार्मिक होते हैं। शनि द्वारा शासित, वे कारण और प्रभाव के नियमों को गहराई से समझते हैं।",
    },
    happinessAndFulfillment: {
      en: "Happiness comes through achievement, financial success, and overcoming challenges. They find fulfillment in building empires — business, family, or personal. Recognition of their strength and perseverance is important.",
      hi: "उपलब्धि, वित्तीय सफलता और चुनौतियों पर काबू पाने से खुशी। साम्राज्य बनाने में संतुष्टि — व्यापार, परिवार या व्यक्तिगत।",
    },
    lifeStyle: {
      en: "Intense, focused, and ambitious. They tend toward all-or-nothing approaches. Their environment reflects their power and status. Work ethic is extreme and they expect the same from others.",
      hi: "तीव्र, केंद्रित और महत्वाकांक्षी। सब या कुछ नहीं के दृष्टिकोण की प्रवृत्ति। वातावरण शक्ति और स्थिति को दर्शाता है।",
    },
    career: {
      en: "Natural in business, finance, law, and positions of power. Executives, entrepreneurs, financial advisors, judges, politicians, and real estate magnates. Their karmic path often involves accumulating and distributing wealth.",
      hi: "व्यापार, वित्त, कानून और शक्ति पदों में स्वाभाविक। कार्यकारी, उद्यमी, वित्तीय सलाहकार, जज और राजनेता।",
    },
    occupation: {
      en: "Finance, banking, real estate, law, politics, construction, mining, and large-scale business management.",
      hi: "वित्त, बैंकिंग, रियल एस्टेट, कानून, राजनीति, निर्माण और बड़े पैमाने के व्यापार प्रबंधन।",
    },
    health: {
      en: "Prone to chronic conditions from overwork, spinal issues, blood pressure, and Saturn-related conditions affecting bones and teeth. Work-life balance, rest, and regular health checks are critical.",
      hi: "अत्यधिक काम से पुरानी बीमारियां, रीढ़ की समस्याएं, रक्तचाप। कार्य-जीवन संतुलन और नियमित स्वास्थ्य जांच महत्वपूर्ण।",
    },
    hobbies: {
      en: "Competitive sports, chess, strategic games, history, business reading, luxury travel, and collecting valuable items.",
      hi: "प्रतिस्पर्धी खेल, शतरंज, रणनीतिक खेल, इतिहास, व्यापार पढ़ना और मूल्यवान वस्तुएं एकत्र करना।",
    },
    loveMatters: {
      en: "Passionate and all-consuming in love but may neglect relationships for career. Need a strong partner who understands their ambition. Best matches with numbers 4, 2, and 6.",
      hi: "प्रेम में जोशीले लेकिन करियर के लिए रिश्ते नजरअंदाज कर सकते हैं। महत्वाकांक्षा को समझने वाले मजबूत साथी की जरूरत। अंक 4, 2 और 6 के साथ सर्वोत्तम मेल।",
    },
    finance: {
      en: "Strong financial magnetism and wealth potential. May experience extreme financial ups and downs. Saturn demands learning karmic lessons around money. Ultimate financial success comes through integrity.",
      hi: "मजबूत वित्तीय चुंबकत्व और धन क्षमता। चरम वित्तीय उतार-चढ़ाव। अखंडता के माध्यम से अंतिम वित्तीय सफलता।",
    },
    education: {
      en: "Determined student who achieves through sheer persistence. May face obstacles in education that require extra effort. Business, law, and engineering are strong academic paths.",
      hi: "दृढ़ छात्र जो शुद्ध दृढ़ता से उपलब्धि हासिल करता है। शिक्षा में बाधाएं अतिरिक्त प्रयास की मांग कर सकती हैं। व्यापार, कानून और इंजीनियरिंग मजबूत मार्ग।",
    },
  },
  9: {
    character: {
      en: "Number 9 individuals are idealistic, humanitarian, and courageous. Ruled by Mars, they have tremendous energy, passion, and the desire to serve. They are natural warriors for truth and justice. Their life is often a heroic journey of giving and transformation.",
      hi: "अंक 9 के जातक आदर्शवादी, मानवतावादी और साहसी होते हैं। मंगल द्वारा शासित, उनमें भारी ऊर्जा, जुनून और सेवा की इच्छा है। सच और न्याय के प्राकृतिक योद्धा।",
    },
    happinessAndFulfillment: {
      en: "Happiness comes through selfless service, making a difference, and achieving their highest ideals. They are happiest when their work has deep meaning and impacts many people. Completion of creative or humanitarian projects brings profound satisfaction.",
      hi: "निःस्वार्थ सेवा, परिवर्तन लाने और उच्चतम आदर्शों तक पहुंचने से खुशी। जब काम का गहरा अर्थ हो और कई लोगों पर प्रभाव पड़े तो सबसे खुश।",
    },
    lifeStyle: {
      en: "Active, passionate, and purpose-driven. They live with a sense of mission and intensity. They can be world travelers or deeply engaged in their community. Periods of intense activity alternate with need for rest and reflection.",
      hi: "सक्रिय, जोशीले और उद्देश्य-संचालित। मिशन और तीव्रता की भावना के साथ जीते हैं। तीव्र गतिविधि की अवधि विश्राम और चिंतन की जरूरत के साथ बदलती है।",
    },
    career: {
      en: "Excel in healing, spiritual teaching, military, social activism, art, and any field where they can make a difference. Doctors, spiritual leaders, activists, artists, philanthropists, and military personnel.",
      hi: "उपचार, आध्यात्मिक शिक्षण, सैन्य, सामाजिक सक्रियता, कला में उत्कृष्ट। डॉक्टर, आध्यात्मिक नेता, सक्रियतावादी और परोपकारी।",
    },
    occupation: {
      en: "Medicine, spirituality, military, law, social work, arts, education, philanthropy, international work, and creative professions with humanitarian purpose.",
      hi: "चिकित्सा, अध्यात्म, सैन्य, कानून, सामाजिक कार्य, कला, शिक्षा और मानवीय उद्देश्य वाले रचनात्मक व्यवसाय।",
    },
    health: {
      en: "Prone to fevers, inflammatory conditions, accidents, head injuries, and burnout from overexertion. Mars energy needs positive outlets through physical exercise. Rest is essential but often neglected.",
      hi: "बुखार, सूजन संबंधी स्थितियां, दुर्घटनाएं और अत्यधिक परिश्रम से थकान। शारीरिक व्यायाम के माध्यम से मंगल ऊर्जा को सकारात्मक आउटलेट जरूरी।",
    },
    hobbies: {
      en: "Martial arts, competitive sports, travel to ancient or spiritual sites, music, painting, social service, and philosophical study.",
      hi: "मार्शल आर्ट, प्रतिस्पर्धी खेल, प्राचीन या आध्यात्मिक स्थलों की यात्रा, संगीत, चित्रकला और दर्शन अध्ययन।",
    },
    loveMatters: {
      en: "Passionate, intense, and idealistic in love. May put their cause above their relationship. Need a partner who shares their values and understands their mission. Best matches with numbers 3, 6, and 1.",
      hi: "प्रेम में जोशीले, तीव्र और आदर्शवादी। मूल्य साझा करने वाले और मिशन समझने वाले साथी की जरूरत। अंक 3, 6 और 1 के साथ सर्वोत्तम मेल।",
    },
    finance: {
      en: "Strong earning potential through their skills and service, but money flows through them rather than accumulating. Generous to a fault. Long-term savings and disciplined investment are important for security.",
      hi: "कौशल और सेवा से मजबूत कमाई क्षमता, लेकिन पैसा जमा होने की बजाय बहता रहता है। बेहद उदार। दीर्घकालिक बचत और अनुशासित निवेश जरूरी।",
    },
    education: {
      en: "Brilliant achievers when passionate about the subject. Excel in medicine, law, arts, and social sciences. May struggle with subjects they find meaningless. Higher education in service-oriented fields is favored.",
      hi: "विषय के प्रति जोशीले होने पर प्रतिभाशाली उपलब्धिकर्ता। चिकित्सा, कानून, कला और सामाजिक विज्ञान में उत्कृष्ट। सेवा-उन्मुख क्षेत्रों में उच्च शिक्षा।",
    },
  },
};
