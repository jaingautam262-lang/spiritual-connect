export interface NadiChapter {
  number: number;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  content: string;
  contentHi: string;
}

export interface Nadi {
  id: string;
  name: string;
  nameHi: string;
  sage: string;
  sageHi: string;
  description: string;
  descriptionHi: string;
  origin: string;
  significance: string;
  chapters: NadiChapter[];
}

const CHAPTERS_TEMPLATE: Omit<NadiChapter, "content" | "contentHi">[] = [
  {
    number: 1,
    title: "General Kandam",
    titleHi: "सामान्य कांडम",
    description:
      "Reveals the seeker's identity, physical appearance, and broad life overview.",
    descriptionHi:
      "साधक की पहचान, शारीरिक रूप और जीवन का सामान्य अवलोकन प्रकट करता है।",
  },
  {
    number: 2,
    title: "Family & Finance",
    titleHi: "परिवार एवं वित्त",
    description:
      "Governs family harmony, accumulated wealth, speech, and material prosperity.",
    descriptionHi:
      "पारिवारिक सौहार्द, संचित धन, वाणी और भौतिक समृद्धि को दर्शाता है।",
  },
  {
    number: 3,
    title: "Sibling & Courage",
    titleHi: "भाई-बहन एवं साहस",
    description:
      "Examines relationships with siblings, personal valor, and communication skills.",
    descriptionHi:
      "भाई-बहनों के साथ संबंध, व्यक्तिगत वीरता और संचार कौशल की परीक्षा करता है।",
  },
  {
    number: 4,
    title: "Mother & Comforts",
    titleHi: "माता एवं सुख-सुविधाएं",
    description:
      "Covers maternal blessings, home comforts, immovable property, and emotional well-being.",
    descriptionHi:
      "मातृ आशीर्वाद, घरेलू सुख, स्थावर संपत्ति और भावनात्मक कल्याण को दर्शाता है।",
  },
  {
    number: 5,
    title: "Progeny",
    titleHi: "संतान",
    description:
      "Reveals matters related to children, their nature, education, and karmic ties.",
    descriptionHi:
      "संतान से संबंधित विषय, उनका स्वभाव, शिक्षा और कार्मिक बंधन प्रकट करता है।",
  },
  {
    number: 6,
    title: "Debts, Disease & Litigation",
    titleHi: "ऋण, रोग एवं मुकदमे",
    description:
      "Exposes hidden enemies, chronic ailments, financial debts, and legal disputes.",
    descriptionHi:
      "छिपे शत्रु, पुराने रोग, वित्तीय ऋण और कानूनी विवादों को उजागर करता है।",
  },
  {
    number: 7,
    title: "Marriage",
    titleHi: "विवाह",
    description:
      "Discloses details about life partner, marital happiness, and conjugal harmony.",
    descriptionHi: "जीवनसाथी, वैवाहिक सुख और दाम्पत्य सौहार्द का विवरण प्रकट करता है।",
  },
  {
    number: 8,
    title: "Longevity",
    titleHi: "दीर्घायु",
    description:
      "Illuminates life span, chronic health patterns, and transformative life events.",
    descriptionHi:
      "जीवनकाल, दीर्घकालिक स्वास्थ्य पैटर्न और जीवन-परिवर्तनकारी घटनाओं को प्रकाशित करता है।",
  },
  {
    number: 9,
    title: "Fortunes & Spiritual Attainment",
    titleHi: "भाग्य एवं आध्यात्मिक उपलब्धि",
    description:
      "Covers higher fortune, pilgrimage, spiritual practices, and divine grace received.",
    descriptionHi:
      "उच्च भाग्य, तीर्थयात्रा, आध्यात्मिक साधना और प्राप्त दैवीय कृपा को दर्शाता है।",
  },
  {
    number: 10,
    title: "Profession",
    titleHi: "व्यवसाय",
    description:
      "Reveals career path, professional achievements, and the field best suited for success.",
    descriptionHi:
      "करियर पथ, व्यावसायिक उपलब्धियां और सफलता के लिए सबसे उपयुक्त क्षेत्र प्रकट करता है।",
  },
  {
    number: 11,
    title: "Profits & Second Marriage",
    titleHi: "लाभ एवं द्वितीय विवाह",
    description:
      "Covers income from multiple sources, elder siblings, and prospects of a second union.",
    descriptionHi:
      "एकाधिक स्रोतों से आय, बड़े भाई-बहन और द्वितीय विवाह की संभावना को दर्शाता है।",
  },
  {
    number: 12,
    title: "Expenditure & Losses",
    titleHi: "व्यय एवं हानि",
    description:
      "Examines foreign travel, moksha possibilities, hidden expenditures, and bed pleasures.",
    descriptionHi:
      "विदेश यात्रा, मोक्ष की संभावना, छिपे व्यय और शयन सुखों की परीक्षा करता है।",
  },
];

function buildChapters(nadiName: string, nadiNameHi: string): NadiChapter[] {
  const contentMap: Record<number, { en: string; hi: string }> = {
    1: {
      en: `The ${nadiName} opens by narrating the seeker's physical features, star, and birth details with remarkable accuracy. The sage confirms the identity through the thumbprint impression, ensuring the leaf belongs to the correct soul. This Kandam establishes the spiritual contract between the reader and the universe.`,
      hi: `${nadiNameHi} साधक के शारीरिक लक्षण, नक्षत्र और जन्म विवरण को अद्भुत सटीकता से वर्णन करके प्रारंभ होती है। ऋषि अंगूठे की छाप के माध्यम से पहचान की पुष्टि करते हैं। यह कांडम पाठक और ब्रह्मांड के बीच आध्यात्मिक अनुबंध स्थापित करता है।`,
    },
    2: {
      en: `The ${nadiName} second chapter explores the seeker's family constellation, the wealth accumulated from birth, and the quality of speech. It predicts how ancestral karma shapes present financial status and whether hidden wealth awaits discovery. Remedies for financial blockages are often encoded within this chapter.`,
      hi: `${nadiNameHi} का द्वितीय अध्याय साधक के पारिवारिक परिवेश, जन्म से संचित धन और वाणी की गुणवत्ता की खोज करता है। यह पूर्वजों के कर्म और वर्तमान वित्तीय स्थिति के संबंध की भविष्यवाणी करता है। वित्तीय बाधाओं के उपाय अक्सर इस अध्याय में छिपे होते हैं।`,
    },
    3: {
      en: `The third chapter of ${nadiName} delves into the seeker's relationship with brothers and sisters, revealing past-life bonds and present-day disputes. It assesses physical courage, determination, and communication abilities. The sage also indicates periods when sibling relationships will flourish or face strain.`,
      hi: `${nadiNameHi} का तृतीय अध्याय साधक के भाई-बहनों के साथ संबंध, पूर्वजन्म के बंधन और वर्तमान विवादों को उजागर करता है। यह शारीरिक साहस, दृढ़ता और संचार क्षमताओं का मूल्यांकन करता है। ऋषि उन कालखंडों का भी संकेत देते हैं जब भाई-बहन संबंध पनपेंगे या तनाव में आएंगे।`,
    },
    4: {
      en: `The ${nadiName} fourth chapter reveals the maternal influence on the seeker's soul journey, describing the mother's health and happiness. It speaks of property ownership, vehicles, and domestic comforts that the native will enjoy. The chapter also uncovers deep emotional patterns rooted in childhood experiences.`,
      hi: `${nadiNameHi} का चतुर्थ अध्याय माता के स्वास्थ्य और सुख का वर्णन करते हुए साधक की आत्मिक यात्रा पर मातृ प्रभाव को प्रकट करता है। यह संपत्ति, वाहन और घरेलू सुखों की बात करता है। यह अध्याय बचपन के अनुभवों में निहित गहरे भावनात्मक पैटर्न को भी उजागर करता है।`,
    },
    5: {
      en: `In the fifth chapter, ${nadiName} details the karmic relationship between the seeker and their children, including the number of offspring and their destinies. It reveals whether childlessness stems from past-life causes and prescribes specific remedies to overcome such karma. The spiritual intelligence and creative potential of the native are also assessed here.`,
      hi: `पंचम अध्याय में ${nadiNameHi} साधक और उनकी संतान के बीच कार्मिक संबंध का विवरण देती है, जिसमें संतान की संख्या और उनकी नियति शामिल है। यह बताता है कि क्या संतानहीनता पूर्वजन्म के कारणों से है और ऐसे कर्म को दूर करने के उपाय बताता है। साधक की आध्यात्मिक बुद्धिमत्ता और रचनात्मक क्षमता का भी मूल्यांकन किया जाता है।`,
    },
    6: {
      en: `The sixth chapter of ${nadiName} exposes the hidden enemies who work against the seeker and reveals the karmic origins of recurring illnesses. It catalogues outstanding debts from previous lives that manifest as present financial or health struggles. Specific remedies including prayers, fasting, and temple visits are prescribed for lasting relief.`,
      hi: `${nadiNameHi} का षष्ठ अध्याय साधक के विरुद्ध काम करने वाले छिपे शत्रुओं को उजागर करता है और बार-बार होने वाली बीमारियों के कार्मिक उद्गम को प्रकट करता है। यह पूर्वजन्मों के बकाया ऋणों को सूचीबद्ध करता है जो वर्तमान वित्तीय या स्वास्थ्य संघर्षों के रूप में प्रकट होते हैं। प्रार्थना, उपवास और मंदिर दर्शन सहित विशिष्ट उपाय बताए जाते हैं।`,
    },
    7: {
      en: `The seventh chapter of ${nadiName} describes the appearance, character, and family background of the seeker's destined life partner. It reveals whether the marriage is ordained early or late, and whether it will bring lasting joy or challenges to be overcome together. The sage also discloses the spiritual purpose behind the union of these two souls.`,
      hi: `${nadiNameHi} का सप्तम अध्याय साधक के नियत जीवनसाथी के रूप, चरित्र और पारिवारिक पृष्ठभूमि का वर्णन करता है। यह बताता है कि विवाह जल्दी होगा या देर से, और क्या यह स्थायी सुख लाएगा। ऋषि इन दो आत्माओं के मिलन के पीछे के आध्यात्मिक उद्देश्य का भी खुलासा करते हैं।`,
    },
    8: {
      en: `The eighth chapter of ${nadiName} addresses the most profound questions about the seeker's life span and the nature of their eventual departure. It reveals periods of acute health vulnerability and the transformative crises that are destined to reshape the soul's direction. This chapter also speaks of occult powers that the seeker may develop through dedicated practice.`,
      hi: `${nadiNameHi} का अष्टम अध्याय साधक की आयु और अंततः उनके जाने की प्रकृति के बारे में सबसे गहन प्रश्नों को संबोधित करता है। यह तीव्र स्वास्थ्य संकट की अवधि और नियत परिवर्तनकारी संकटों को प्रकट करता है। यह अध्याय उन गुप्त शक्तियों की भी बात करता है जो साधक समर्पित अभ्यास से विकसित कर सकता है।`,
    },
    9: {
      en: `The ninth chapter of ${nadiName} illuminates the seeker's destined fortune, including inheritance, long journeys, and encounters with great spiritual masters. It reveals the specific deity whose grace will most powerfully uplift the seeker's life and the pilgrimage sites that hold special karmic significance. Dharmic merit accumulated over many lifetimes is assessed here.`,
      hi: `${nadiNameHi} का नवम अध्याय साधक के नियत भाग्य को प्रकाशित करता है, जिसमें विरासत, लंबी यात्राएं और महान आध्यात्मिक गुरुओं से मुलाकात शामिल है। यह उस विशिष्ट देवता को प्रकट करता है जिनकी कृपा साधक के जीवन को सबसे शक्तिशाली रूप से उत्थान देगी। कई जन्मों में संचित धार्मिक पुण्य का यहाँ मूल्यांकन किया जाता है।`,
    },
    10: {
      en: `The tenth chapter of ${nadiName} maps the seeker's professional destiny, naming the field, industry, or vocation in which the native will excel. It reveals the peak earning periods and the professional allies and obstacles that karma has placed on the path. The sage often prescribes specific remedies to accelerate career growth and remove professional blockages.`,
      hi: `${nadiNameHi} का दशम अध्याय साधक के व्यावसायिक भाग्य को मानचित्रित करता है, उस क्षेत्र या व्यवसाय का नाम बताता है जिसमें साधक उत्कृष्टता प्राप्त करेगा। यह अधिकतम कमाई की अवधि और कर्म द्वारा रखे गए व्यावसायिक सहयोगियों और बाधाओं को प्रकट करता है। ऋषि अक्सर करियर विकास को तेज करने के लिए विशिष्ट उपाय बताते हैं।`,
    },
    11: {
      en: `The eleventh chapter of ${nadiName} reveals income flowing from unexpected sources, gains from foreign connections, and the role of elder siblings in the seeker's fortune. It also addresses the possibility and circumstances of a second marriage or significant second partnership. The seeker's social network and its karmic importance in fulfilling life goals are examined.`,
      hi: `${nadiNameHi} का एकादश अध्याय अप्रत्याशित स्रोतों से प्रवाहित आय, विदेशी संपर्कों से लाभ और साधक के भाग्य में बड़े भाई-बहन की भूमिका को प्रकट करता है। यह द्वितीय विवाह की संभावना और परिस्थितियों को भी संबोधित करता है। जीवन लक्ष्यों को पूरा करने में साधक के सामाजिक नेटवर्क और उसके कार्मिक महत्व की जांच की जाती है।`,
    },
    12: {
      en: `The twelfth chapter of ${nadiName} examines the seeker's expenditure patterns, foreign sojourns, and the ultimate spiritual liberation awaiting the soul. It reveals whether the native is destined for moksha in this lifetime or must return for further karmic completion. The sage prescribes final remedies — donations, rituals, and acts of service — to ensure a graceful and spiritually abundant conclusion to this incarnation.`,
      hi: `${nadiNameHi} का द्वादश अध्याय साधक के व्यय पैटर्न, विदेश प्रवास और आत्मा की प्रतीक्षा में अंतिम आध्यात्मिक मुक्ति की परीक्षा करता है। यह बताता है कि क्या साधक इस जन्म में मोक्ष के लिए नियत है या आगे कार्मिक पूर्णता के लिए लौटना होगा। ऋषि अंतिम उपाय बताते हैं — दान, अनुष्ठान और सेवा के कार्य।`,
    },
  };

  return CHAPTERS_TEMPLATE.map((ch) => ({
    ...ch,
    content: contentMap[ch.number].en,
    contentHi: contentMap[ch.number].hi,
  }));
}

export const nadis: Nadi[] = [
  {
    id: "shiv-sukshama-nadi",
    name: "Shiv Sukshama Nadi",
    nameHi: "शिव सूक्ष्म नाड़ी",
    sage: "Sage Shiva",
    sageHi: "ऋषि शिव",
    description:
      "The Shiv Sukshama Nadi is one of the most revered of all Nadi scriptures, channeled through the cosmic consciousness of Lord Shiva himself. Written on ancient palm leaves in the Vatteluttu script of Tamil Nadu, it captures the precise life blueprint of every soul destined to seek it. The Sukshama (subtle) energy of Shiva permeates every leaf, offering divine prescriptions for karmic healing.",
    descriptionHi:
      "शिव सूक्ष्म नाड़ी सभी नाड़ी ग्रंथों में सबसे पूजनीय है, जो स्वयं भगवान शिव की ब्रह्मांडीय चेतना के माध्यम से प्रकट हुई है। तमिलनाडु की वट्टेलुत्तु लिपि में प्राचीन ताड़पत्रों पर लिखी गई, यह हर आत्मा के सटीक जीवन खाके को कैप्चर करती है। शिव की सूक्ष्म ऊर्जा हर पत्ती में व्याप्त है, जो कार्मिक उपचार के लिए दिव्य नुस्खे प्रदान करती है।",
    origin: "Tamil Nadu, India — Vatteluttu Script on Palm Leaves",
    significance:
      "Direct transmission from Lord Shiva; addresses past-life karma and prescribes powerful Shaivite remedies",
    chapters: buildChapters("Shiv Sukshama Nadi", "शिव सूक्ष्म नाड़ी"),
  },
  {
    id: "thuliya-nadi",
    name: "Thuliya Nadi",
    nameHi: "थुलिया नाड़ी",
    sage: "Sage Agastya (Thuliya lineage)",
    sageHi: "ऋषि अगस्त्य (थुलिया वंश)",
    description:
      "The Thuliya Nadi derives its name from the sacred weighing scales of dharma, symbolizing the balanced cosmic judgment that governs each soul's journey. Preserved in special Nadi reading centres of Vaitheeswaran Koil in Tamil Nadu, this scripture is known for its extraordinarily precise identification of the seeker and detailed remedial prescriptions. It balances divine insight with practical wisdom for modern seekers.",
    descriptionHi:
      "थुलिया नाड़ी अपना नाम धर्म के पवित्र तराजू से लेती है, जो हर आत्मा की यात्रा को नियंत्रित करने वाले संतुलित ब्रह्मांडीय न्याय का प्रतीक है। तमिलनाडु के वैथीश्वरन कोइल के विशेष नाड़ी पठन केंद्रों में संरक्षित, यह ग्रंथ साधक की असाधारण रूप से सटीक पहचान और विस्तृत उपचार प्रक्रियाओं के लिए जाना जाता है।",
    origin: "Vaitheeswaran Koil, Tamil Nadu — Ancient Tamil Script",
    significance:
      "Known for extraordinary accuracy in identifying seekers through thumbprint; emphasizes dharmic balance and precise remedies",
    chapters: buildChapters("Thuliya Nadi", "थुलिया नाड़ी"),
  },
  {
    id: "agastya-nadi",
    name: "Agastya Nadi",
    nameHi: "अगस्त्य नाड़ी",
    sage: "Sage Agastya (Agasthiyar)",
    sageHi: "ऋषि अगस्त्य (अगस्तियार)",
    description:
      "The Agastya Nadi is the most widely known of all Nadi scriptures, composed by the immortal Siddha sage Agastya who is said to have cognised the destinies of millions of souls across time. His palm leaf manuscripts, preserved across Tamil Nadu and Sri Lanka, contain extraordinary detail about each chapter of life and prescribe Siddha medicine, mantra, and devotional remedies. Agastya's compassion for suffering humanity shines through every leaf.",
    descriptionHi:
      "अगस्त्य नाड़ी सभी नाड़ी ग्रंथों में सबसे व्यापक रूप से जानी जाती है, जिसे अमर सिद्ध ऋषि अगस्त्य ने रचा है जो कहा जाता है कि उन्होंने कालातीत लाखों आत्माओं की नियति को जाना था। तमिलनाडु और श्रीलंका में संरक्षित उनकी ताड़पत्र पांडुलिपियां जीवन के प्रत्येक अध्याय के बारे में असाधारण विवरण देती हैं। पीड़ित मानवता के लिए अगस्त्य की करुणा हर पत्ती में चमकती है।",
    origin: "Tamil Nadu & Sri Lanka — Agasthiyar Ashram tradition",
    significance:
      "Most widely accessible Nadi; combines Siddha medicine, mantra therapy, and astrological remedies for holistic healing",
    chapters: buildChapters("Agastya Nadi", "अगस्त्य नाड़ी"),
  },
  {
    id: "nandi-nadi",
    name: "Nandi Nadi",
    nameHi: "नंदी नाड़ी",
    sage: "Nandi (Sage Nandikeshvara)",
    sageHi: "नंदी (ऋषि नंदीकेश्वर)",
    description:
      "The Nandi Nadi originates from Nandikeshvara, the divine bull and ardent devotee of Lord Shiva who serves as the celestial gatekeeper of Mount Kailash. This scripture is revered for its esoteric spiritual revelations, particularly in the domains of Kundalini awakening, tantric remedies, and past-life regression insights. The Nandi Nadi is especially powerful for those on a deep spiritual path seeking liberation.",
    descriptionHi:
      "नंदी नाड़ी नंदीकेश्वर से उत्पन्न होती है, जो भगवान शिव के दिव्य बैल और परम भक्त हैं जो माउंट कैलाश के आकाशीय द्वारपाल के रूप में सेवा करते हैं। यह ग्रंथ अपने गूढ़ आध्यात्मिक रहस्योद्घाटन के लिए पूजनीय है, विशेष रूप से कुंडलिनी जागरण, तांत्रिक उपाय और पूर्वजन्म प्रतिगमन अंतर्दृष्टि के क्षेत्रों में।",
    origin: "Kailash tradition — preserved in Tamil Nadu Nadi centres",
    significance:
      "Esoteric and spiritually advanced; specializes in Kundalini, tantra, and liberation-oriented guidance",
    chapters: buildChapters("Nandi Nadi", "नंदी नाड़ी"),
  },
  {
    id: "prasna-nadi",
    name: "Prasna Nadi",
    nameHi: "प्रश्न नाड़ी",
    sage: "Various Saptarishis",
    sageHi: "विभिन्न सप्तर्षि",
    description:
      "The Prasna Nadi is unique among Nadi scriptures in that it operates through the power of direct questioning — the seeker's very intention and the moment of asking become the basis of the reading. Compiled by the collective wisdom of the Saptarishis (Seven Great Sages), this Nadi delivers immediate and actionable divine guidance on any pressing life question. It is especially favored for urgent matters of health, wealth, and relationships.",
    descriptionHi:
      "प्रश्न नाड़ी नाड़ी ग्रंथों में अद्वितीय है क्योंकि यह प्रत्यक्ष प्रश्न की शक्ति के माध्यम से काम करती है — साधक का इरादा और पूछने का क्षण पठन का आधार बन जाता है। सप्तर्षियों की सामूहिक बुद्धि द्वारा संकलित, यह नाड़ी किसी भी महत्वपूर्ण जीवन प्रश्न पर तत्काल और क्रियाशील दैवीय मार्गदर्शन प्रदान करती है।",
    origin: "Saptarishi tradition — Multiple Nadi centres across South India",
    significance:
      "Question-based system for immediate guidance; covers any pressing life matter with actionable divine prescriptions",
    chapters: buildChapters("Prasna Nadi", "प्रश्न नाड़ी"),
  },
];

export function getNadiById(id: string): Nadi | undefined {
  return nadis.find((n) => n.id === id);
}
