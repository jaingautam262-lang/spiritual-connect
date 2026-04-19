export interface StorySlide {
  id: string;
  imageUrl: string;
  bgColor: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
}

export interface WebStory {
  id: string;
  title: string;
  titleHindi: string;
  category: "festivals" | "deities" | "mantras" | "vrat";
  thumbnail: string;
  bgColor: string;
  isPublished: boolean;
  slides: StorySlide[];
  createdAt: number;
  updatedAt: number;
}

export const webStoriesData: WebStory[] = [
  // ── Festival Stories ──────────────────────────────────────────────────────
  {
    id: "ws-01",
    title: "Diwali: The Festival of Lights",
    titleHindi: "दीपावली: दीपों का पर्व",
    category: "festivals",
    thumbnail: "/assets/stories/diwali-thumb.jpg",
    bgColor: "oklch(0.25 0.12 35)",
    isPublished: true,
    createdAt: 1742000000000,
    updatedAt: 1742000000000,
    slides: [
      {
        id: "ws-01-s1",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.10 35) 0%, oklch(0.30 0.16 50) 100%)",
        title: "Diwali 2026",
        titleHindi: "दीपावली 2026",
        description:
          "The most celebrated Hindu festival of lights, symbolising the victory of light over darkness and knowledge over ignorance.",
        descriptionHindi:
          "प्रकाश का पर्व — अंधकार पर प्रकाश की, अज्ञान पर ज्ञान की विजय का प्रतीक।",
      },
      {
        id: "ws-01-s2",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.28 0.14 42) 0%, oklch(0.20 0.08 28) 100%)",
        title: "5 Days of Celebration",
        titleHindi: "पाँच दिनों का उत्सव",
        description:
          "Diwali spans five sacred days: Dhanteras, Choti Diwali, Lakshmi Puja, Govardhan Puja, and Bhai Dooj.",
        descriptionHindi:
          "धनतेरस, छोटी दीपावली, लक्ष्मी पूजन, गोवर्धन पूजा और भाई दूज — पाँच पावन दिन।",
      },
      {
        id: "ws-01-s3",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.32 0.18 55) 0%, oklch(0.20 0.10 32) 100%)",
        title: "Lakshmi Puja",
        titleHindi: "लक्ष्मी पूजन",
        description:
          "On Amavasya night, goddess Lakshmi is worshipped with 108 diyas, rangoli, and sweets. Homes are lit brilliantly to welcome her.",
        descriptionHindi:
          "अमावस्या की रात 108 दीपक, रंगोली और मिठाई से माँ लक्ष्मी का स्वागत। घर द्वार सजाएं।",
      },
      {
        id: "ws-01-s4",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.20 0.08 22) 0%, oklch(0.35 0.15 60) 100%)",
        title: "Spiritual Significance",
        titleHindi: "आध्यात्मिक महत्व",
        description:
          "Lord Rama's return to Ayodhya after 14 years of exile was celebrated by citizens lighting oil lamps — the origin of Diwali.",
        descriptionHindi:
          "14 वर्ष के वनवास के बाद प्रभु राम की अयोध्या वापसी पर नगरवासियों ने दीप जलाए — यही दीपावली की उत्पत्ति है।",
      },
      {
        id: "ws-01-s5",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.25 0.14 45) 0%, oklch(0.18 0.06 20) 100%)",
        title: "Jain Connection",
        titleHindi: "जैन संबंध",
        description:
          "For Jains, Diwali marks the Moksha Kalyanak of Lord Mahavira — the night he attained nirvana at Pavapuri in 527 BCE.",
        descriptionHindi:
          "जैनों के लिए दीपावली महावीर स्वामी का मोक्ष कल्याणक है — 527 ईपू पावापुरी में निर्वाण की रात।",
      },
      {
        id: "ws-01-s6",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.30 0.16 50) 0%, oklch(0.22 0.12 38) 100%)",
        title: "Chopda Puja",
        titleHindi: "चोपड़ा पूजन",
        description:
          "Merchants begin their new financial year with Chopda Puja — worshipping new account books and seeking Lakshmi's blessings for prosperity.",
        descriptionHindi:
          "व्यापारी नई बही-खाता का पूजन करके नए वित्तीय वर्ष की शुरुआत करते हैं — समृद्धि की कामना के साथ।",
      },
    ],
  },
  {
    id: "ws-02",
    title: "Navratri: Nine Nights of Devi",
    titleHindi: "नवरात्रि: देवी के नौ रूप",
    category: "festivals",
    thumbnail: "/assets/stories/navratri-thumb.jpg",
    bgColor: "oklch(0.20 0.08 0)",
    isPublished: true,
    createdAt: 1741500000000,
    updatedAt: 1741500000000,
    slides: [
      {
        id: "ws-02-s1",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.10 5) 0%, oklch(0.30 0.14 15) 100%)",
        title: "Navratri",
        titleHindi: "नवरात्रि",
        description:
          "Navratri means 'nine nights'. It celebrates the divine feminine energy across nine sacred days, occurring four times each year.",
        descriptionHindi:
          "नवरात्रि का अर्थ है 'नौ रातें'। यह साल में चार बार आती है और दैवीय स्त्री शक्ति का उत्सव है।",
      },
      {
        id: "ws-02-s2",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.26 0.12 10) 0%, oklch(0.20 0.08 0) 100%)",
        title: "Day 1: Shailputri",
        titleHindi: "दिन 1: शैलपुत्री",
        description:
          "Daughter of the Himalayas, Shailputri rides a bull and holds a trident. Wear yellow and offer jasmine. She represents purity and peace.",
        descriptionHindi:
          "हिमालय की पुत्री शैलपुत्री वृषभ पर सवार हैं। पीला वस्त्र पहनें, चमेली अर्पित करें — शुद्धता और शांति की देवी।",
      },
      {
        id: "ws-02-s3",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.20 0.06 3) 0%, oklch(0.28 0.12 10) 100%)",
        title: "Day 3: Chandraghanta",
        titleHindi: "दिन 3: चंद्रघंटा",
        description:
          "With a crescent moon on her forehead and ten arms, Chandraghanta destroys demons. Wear grey and offer milk sweets.",
        descriptionHindi:
          "माथे पर अर्धचंद्र और दस भुजाओं वाली चंद्रघंटा राक्षसों का नाश करती हैं। ग्रे वस्त्र, दूध की मिठाई।",
      },
      {
        id: "ws-02-s4",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.28 0.14 8) 0%, oklch(0.18 0.06 0) 100%)",
        title: "Day 6: Katyayani",
        titleHindi: "दिन 6: कात्यायनी",
        description:
          "The warrior goddess Katyayani is worshipped for marriage blessings. Young women observe Katyayani Vrat to attain a good husband.",
        descriptionHindi:
          "योद्धा देवी कात्यायनी विवाह की इच्छाओं को पूरी करती हैं। कुँवारी कन्याएं अच्छे वर के लिए व्रत रखती हैं।",
      },
      {
        id: "ws-02-s5",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.10 5) 0%, oklch(0.30 0.14 18) 100%)",
        title: "Day 8: Mahagauri",
        titleHindi: "दिन 8: महागौरी",
        description:
          "Mahagauri, the purest form of Devi, wears all white. She grants peace and purity. Worship her with coconut and white flowers.",
        descriptionHindi:
          "सर्वाधिक शुद्ध स्वरूप महागौरी श्वेत वस्त्रों में हैं। शांति और पवित्रता प्रदान करती हैं। नारियल और सफेद फूल चढ़ाएं।",
      },
      {
        id: "ws-02-s6",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.25 0.12 8) 0%, oklch(0.20 0.08 2) 100%)",
        title: "Garba & Dandiya",
        titleHindi: "गरबा और डांडिया",
        description:
          "The circular dance of Garba and the stick dance Dandiya Raas are performed throughout Navratri, especially in Gujarat.",
        descriptionHindi:
          "गुजरात में नवरात्रि के दौरान गरबा और डांडिया रास की धूम — नौ रातें नृत्य, संगीत और भक्ति का संगम।",
      },
    ],
  },

  // ── Deity Stories ─────────────────────────────────────────────────────────
  {
    id: "ws-03",
    title: "Lord Ganesha: The Elephant God",
    titleHindi: "भगवान गणेश: विघ्नहर्ता",
    category: "deities",
    thumbnail: "/assets/stories/ganesha-thumb.jpg",
    bgColor: "oklch(0.22 0.10 60)",
    isPublished: true,
    createdAt: 1741800000000,
    updatedAt: 1741800000000,
    slides: [
      {
        id: "ws-03-s1",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.12 58) 0%, oklch(0.30 0.16 65) 100%)",
        title: "Shri Ganesha",
        titleHindi: "श्री गणेश",
        description:
          "Lord Ganesha, the son of Shiva and Parvati, is worshipped before every auspicious beginning. He removes obstacles and bestows wisdom.",
        descriptionHindi:
          "शिव-पार्वती पुत्र गणेश हर शुभ कार्य के प्रारंभ में पूजे जाते हैं। विघ्नों का नाश और बुद्धि का वरदान देते हैं।",
      },
      {
        id: "ws-03-s2",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.25 0.14 62) 0%, oklch(0.18 0.08 48) 100%)",
        title: "The Elephant Head",
        titleHindi: "गज मस्तक",
        description:
          "According to Shiva Purana, Ganesha was beheaded by Shiva in anger. To revive him, Shiva replaced his head with that of an elephant.",
        descriptionHindi:
          "शिव पुराण के अनुसार शिव के क्रोध में गणेश का मस्तक कट गया। जीवित करने के लिए हाथी का मस्तक लगाया गया।",
      },
      {
        id: "ws-03-s3",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.20 0.10 55) 0%, oklch(0.28 0.14 65) 100%)",
        title: "108 Names of Ganesha",
        titleHindi: "गणेश के 108 नाम",
        description:
          "Ganesha has 108 names including Vighnaharta (remover of obstacles), Buddhi Pradayaka (giver of wisdom), Gajanana (elephant-faced), and Lambodara (large-bellied).",
        descriptionHindi:
          "विघ्नहर्ता, बुद्धि प्रदायक, गजानन, लंबोदर — गणेश के 108 नामों में से कुछ। इन्हें याद करना अत्यंत पुण्यदायी है।",
      },
      {
        id: "ws-03-s4",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.28 0.16 65) 0%, oklch(0.20 0.10 50) 100%)",
        title: "Chaturthi Vrat",
        titleHindi: "चतुर्थी व्रत",
        description:
          "Every month on Chaturthi (4th day after new moon), Ganesh Chaturthi Vrat is observed. The annual Ganesh Utsav runs for 10 days starting Bhadrapada Shukla 4.",
        descriptionHindi:
          "प्रत्येक माह चतुर्थी को गणेश व्रत होता है। भाद्रपद शुक्ल चतुर्थी से 10 दिन का गणेश उत्सव मनाया जाता है।",
      },
      {
        id: "ws-03-s5",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.12 58) 0%, oklch(0.32 0.16 70) 100%)",
        title: "Ganesh in Jainism",
        titleHindi: "जैन धर्म में गणेश",
        description:
          "Ganesha appears in Jain iconography as a protector deity. In some Jain traditions, Ganesha is revered as a Yaksha who guards the Tirthankaras.",
        descriptionHindi:
          "जैन धर्म में गणेश रक्षक देव के रूप में प्रकट होते हैं। कुछ जैन परंपराओं में वे तीर्थंकरों की रक्षा करने वाले यक्ष माने जाते हैं।",
      },
      {
        id: "ws-03-s6",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.25 0.14 62) 0%, oklch(0.18 0.08 45) 100%)",
        title: "Ganesha Mantra",
        titleHindi: "गणेश मंत्र",
        description:
          '"Om Gam Ganapataye Namaha" — Chanting this mantra 108 times before any new beginning invokes Ganesha\'s blessings for success.',
        descriptionHindi:
          '"ॐ गं गणपतये नमः" — किसी भी नए कार्य से पहले इस मंत्र का 108 बार जाप करने से सफलता मिलती है।',
      },
      {
        id: "ws-03-s7",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.20 0.10 52) 0%, oklch(0.30 0.16 68) 100%)",
        title: "Modak: The Divine Sweet",
        titleHindi: "मोदक: दिव्य मिठाई",
        description:
          "Modak is Lord Ganesha's favourite sweet. Offering modak in puja and distributing as prasad brings immense blessings.",
        descriptionHindi:
          "मोदक गणेशजी का सबसे प्रिय भोग है। पूजा में मोदक चढ़ाकर प्रसाद वितरण करने से अपार आशीर्वाद मिलता है।",
      },
    ],
  },
  {
    id: "ws-04",
    title: "Lord Mahavira: The Great Victor",
    titleHindi: "भगवान महावीर: महावीर की जीवन गाथा",
    category: "deities",
    thumbnail: "/assets/stories/mahavira-thumb.jpg",
    bgColor: "oklch(0.18 0.06 200)",
    isPublished: true,
    createdAt: 1741600000000,
    updatedAt: 1741600000000,
    slides: [
      {
        id: "ws-04-s1",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.18 0.08 195) 0%, oklch(0.25 0.10 200) 100%)",
        title: "Vardhamana Mahavira",
        titleHindi: "वर्धमान महावीर",
        description:
          "Born as Vardhamana in 599 BCE in Kundagrama (Bihar), Lord Mahavira was the 24th and last Tirthankar of this cosmic cycle.",
        descriptionHindi:
          "599 ईपू कुंडग्राम (बिहार) में वर्धमान के रूप में जन्मे भगवान महावीर इस कालचक्र के 24वें और अंतिम तीर्थंकर हैं।",
      },
      {
        id: "ws-04-s2",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.10 200) 0%, oklch(0.18 0.06 192) 100%)",
        title: "The Great Renunciation",
        titleHindi: "महाभिनिष्क्रमण",
        description:
          "At age 30, Mahavira renounced his royal life, wealth, and family. He pulled out his hair (kesh lonch) and began 12 years of intense austerity.",
        descriptionHindi:
          "30 वर्ष की आयु में उन्होंने राजपाट, धन और परिवार त्याग दिया। केशलोंच करके 12 वर्ष की कठोर तपश्चर्या शुरू की।",
      },
      {
        id: "ws-04-s3",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.16 0.06 195) 0%, oklch(0.25 0.10 202) 100%)",
        title: "Kevalgyan",
        titleHindi: "केवलज्ञान",
        description:
          "After 12 years of meditation under a Saal tree in Jrimbhikagrama, Mahavira attained Kevalgyan (omniscience) on Vaishakh Shukla Dashami.",
        descriptionHindi:
          "जृम्भिकग्राम में साल वृक्ष के नीचे 12 वर्ष की तपश्चर्या के बाद वैशाख शुक्ल दशमी को केवलज्ञान की प्राप्ति।",
      },
      {
        id: "ws-04-s4",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.10 198) 0%, oklch(0.18 0.08 194) 100%)",
        title: "Five Great Teachings",
        titleHindi: "पाँच महाव्रत",
        description:
          "Mahavira's five cardinal principles: Ahimsa (non-violence), Satya (truth), Asteya (non-stealing), Brahmacharya (chastity), Aparigraha (non-possessiveness).",
        descriptionHindi:
          "अहिंसा, सत्य, अस्तेय, ब्रह्मचर्य, अपरिग्रह — भगवान महावीर के पाँच महाव्रत जो संपूर्ण जैन धर्म की आधारशिला हैं।",
      },
      {
        id: "ws-04-s5",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.18 0.06 192) 0%, oklch(0.26 0.10 202) 100%)",
        title: "Moksha at Pavapuri",
        titleHindi: "पावापुरी में मोक्ष",
        description:
          "At age 72, Lord Mahavira attained moksha (liberation) at Pavapuri on Kartik Krishna Amavasya — the night celebrated as Diwali by Jains.",
        descriptionHindi:
          "72 वर्ष की आयु में पावापुरी में कार्तिक कृष्ण अमावस्या को मोक्ष प्राप्त हुआ — जैनों की दीपावली यही है।",
      },
    ],
  },

  // ── Mantra Stories ────────────────────────────────────────────────────────
  {
    id: "ws-05",
    title: "Gayatri Mantra: The Mother of All Mantras",
    titleHindi: "गायत्री मंत्र: सभी मंत्रों की माता",
    category: "mantras",
    thumbnail: "/assets/stories/gayatri-thumb.jpg",
    bgColor: "oklch(0.20 0.10 80)",
    isPublished: true,
    createdAt: 1742100000000,
    updatedAt: 1742100000000,
    slides: [
      {
        id: "ws-05-s1",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.20 0.12 82) 0%, oklch(0.28 0.16 75) 100%)",
        title: "The Gayatri Mantra",
        titleHindi: "गायत्री मंत्र",
        description:
          '"Om Bhur Bhuvah Svah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat" — the most sacred Vedic mantra.',
        descriptionHindi:
          '"ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्" — सबसे पवित्र वैदिक मंत्र।',
      },
      {
        id: "ws-05-s2",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.25 0.14 78) 0%, oklch(0.18 0.08 65) 100%)",
        title: "Meaning",
        titleHindi: "अर्थ",
        description:
          '"We meditate on the Divine Light of the Sun (Savitri), which illuminates all three worlds. May that radiant light illuminate our intellect."',
        descriptionHindi:
          '"हम उस दिव्य सूर्यतेज का ध्यान करते हैं जो तीनों लोकों को प्रकाशित करता है। वह प्रकाश हमारी बुद्धि को प्रेरित करे।"',
      },
      {
        id: "ws-05-s3",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.12 80) 0%, oklch(0.30 0.16 88) 100%)",
        title: "Vedic Origin",
        titleHindi: "वैदिक उत्पत्ति",
        description:
          "From the Rigveda (3.62.10), composed by sage Vishwamitra, the Gayatri Mantra has 24 syllables that correspond to 24 letters of the alphabet.",
        descriptionHindi:
          "ऋग्वेद (3.62.10) के ऋषि विश्वामित्र द्वारा रचित। इस मंत्र के 24 अक्षर 24 वर्णों के प्रतीक हैं।",
      },
      {
        id: "ws-05-s4",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.18 0.10 72) 0%, oklch(0.28 0.14 82) 100%)",
        title: "When to Chant",
        titleHindi: "कब जाप करें",
        description:
          "Chant Gayatri Mantra during Sandhyakaal — at dawn (Pratahsandhi), noon (Madhyanhinasandhi), and dusk (Sayam Sandhi). These are the most potent times.",
        descriptionHindi:
          "गायत्री मंत्र का जाप संध्याकाल में करें — प्रातःसंधि (सूर्योदय), मध्याह्नसंधि (दोपहर) और सायंसंधि (सूर्यास्त) — ये तीनों श्रेष्ठ समय हैं।",
      },
      {
        id: "ws-05-s5",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.28 0.16 85) 0%, oklch(0.20 0.10 72) 100%)",
        title: "Scientific Benefits",
        titleHindi: "वैज्ञानिक लाभ",
        description:
          "Research shows Gayatri Mantra chanting activates the pineal gland, synchronises brain hemispheres, reduces stress hormones, and improves immune function.",
        descriptionHindi:
          "शोध में पाया गया: गायत्री मंत्र जाप से पीनियल ग्रंथि सक्रिय, मस्तिष्क संतुलन, तनाव हार्मोन में कमी और प्रतिरोधक क्षमता में सुधार।",
      },
      {
        id: "ws-05-s6",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.12 78) 0%, oklch(0.30 0.16 90) 100%)",
        title: "108 Repetitions",
        titleHindi: "108 जाप",
        description:
          "Chanting Gayatri Mantra 108 times daily for 40 consecutive days creates a powerful spiritual transformation. Use a rudraksha mala to count.",
        descriptionHindi:
          "40 दिन तक प्रतिदिन 108 बार जाप से शक्तिशाली आध्यात्मिक परिवर्तन होता है। रुद्राक्ष माला से गणना करें।",
      },
    ],
  },
  {
    id: "ws-06",
    title: "Mahamrityunjaya Mantra: Conquer Death and Disease",
    titleHindi: "महामृत्युंजय मंत्र: मृत्यु और रोग पर विजय",
    category: "mantras",
    thumbnail: "/assets/stories/mahamrityunjaya-thumb.jpg",
    bgColor: "oklch(0.18 0.08 250)",
    isPublished: true,
    createdAt: 1741900000000,
    updatedAt: 1741900000000,
    slides: [
      {
        id: "ws-06-s1",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.18 0.10 252) 0%, oklch(0.25 0.12 248) 100%)",
        title: "The Mahamrityunjaya Mantra",
        titleHindi: "महामृत्युंजय मंत्र",
        description:
          '"Om Tryambakam Yajamahe Sugandhim Pushtivardhanam, Urvarukamiva Bandhanan Mrityor Mukshiya Mamritat" — the great death-conquering mantra.',
        descriptionHindi:
          '"ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्" — महामृत्युंजय मंत्र।',
      },
      {
        id: "ws-06-s2",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.12 248) 0%, oklch(0.18 0.08 255) 100%)",
        title: "The Three-Eyed One",
        titleHindi: "त्र्यम्बकम्",
        description:
          "Tryambaka means 'three-eyed' — Lord Shiva's three eyes represent the sun (right), moon (left), and fire of wisdom (third eye, Ajna Chakra).",
        descriptionHindi:
          "त्र्यम्बक का अर्थ 'तीन आँखों वाले' — शिव की तीन आँखें सूर्य (दाईं), चंद्र (बाईं) और ज्ञान की अग्नि (तीसरी आँख, आज्ञा चक्र) हैं।",
      },
      {
        id: "ws-06-s3",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.20 0.10 252) 0%, oklch(0.28 0.14 244) 100%)",
        title: "When to Use",
        titleHindi: "कब उपयोग करें",
        description:
          "Chant during illness, life-threatening situations, or daily for protection. Best time: Brahma Muhurta (90 minutes before sunrise). Minimum 108 repetitions.",
        descriptionHindi:
          "रोग, जीवन-संकट या दैनिक सुरक्षा के लिए जाप करें। ब्रह्म मुहूर्त (सूर्योदय से 90 मिनट पहले) सर्वश्रेष्ठ। न्यूनतम 108 बार।",
      },
      {
        id: "ws-06-s4",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.25 0.12 248) 0%, oklch(0.18 0.08 255) 100%)",
        title: "Rudra Abhishek",
        titleHindi: "रुद्राभिषेक",
        description:
          "The most powerful form is Rudra Abhishek — chanting Mahamrityunjaya 1.25 lakh (125,000) times with sacred offerings over 7 to 11 days.",
        descriptionHindi:
          "सबसे शक्तिशाली प्रयोग है रुद्राभिषेक — 7 से 11 दिनों में सवा लाख (1,25,000) बार जाप के साथ अभिषेक।",
      },
      {
        id: "ws-06-s5",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.18 0.08 250) 0%, oklch(0.25 0.12 258) 100%)",
        title: "Healing Power",
        titleHindi: "उपचार शक्ति",
        description:
          "This mantra is prescribed for healing serious diseases. Families of the ill chant it 11,000 times for recovery. Modern hospitals in India offer Maha Mrityunjaya Japa services.",
        descriptionHindi:
          "गंभीर रोगों में परिवार 11,000 बार जाप करते हैं। भारत के कई अस्पतालों में महामृत्युंजय जप सेवा उपलब्ध है।",
      },
    ],
  },

  // ── Vrat Stories ──────────────────────────────────────────────────────────
  {
    id: "ws-07",
    title: "Ekadashi Vrat: The Sacred Fast of the 11th",
    titleHindi: "एकादशी व्रत: ग्यारसवीं का पवित्र उपवास",
    category: "vrat",
    thumbnail: "/assets/stories/ekadashi-thumb.jpg",
    bgColor: "oklch(0.20 0.08 145)",
    isPublished: true,
    createdAt: 1741700000000,
    updatedAt: 1741700000000,
    slides: [
      {
        id: "ws-07-s1",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.20 0.10 148) 0%, oklch(0.28 0.14 142) 100%)",
        title: "Ekadashi",
        titleHindi: "एकादशी",
        description:
          "Ekadashi falls on the 11th lunar day (tithi) of both the bright fortnight (Shukla Paksha) and dark fortnight (Krishna Paksha), totalling 24 times per year.",
        descriptionHindi:
          "शुक्ल और कृष्ण पक्ष की ग्यारहवीं तिथि को एकादशी होती है — साल में 24 बार। यह भगवान विष्णु को समर्पित व्रत है।",
      },
      {
        id: "ws-07-s2",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.25 0.12 145) 0%, oklch(0.18 0.08 152) 100%)",
        title: "Importance",
        titleHindi: "महत्व",
        description:
          "Ekadashi is dedicated to Lord Vishnu. The Brahma Vaivarta Purana states that fasting on Ekadashi destroys the sins of many lifetimes.",
        descriptionHindi:
          "ब्रह्म वैवर्त पुराण कहता है: एकादशी व्रत से अनेक जन्मों के पाप नष्ट होते हैं। यह विष्णु की सबसे प्रिय तिथि है।",
      },
      {
        id: "ws-07-s3",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.10 148) 0%, oklch(0.30 0.14 140) 100%)",
        title: "Fasting Rules",
        titleHindi: "उपवास नियम",
        description:
          "On Dashami (10th): eat only once before sunset. On Ekadashi: complete fast or fruit/milk only. On Dwadashi (12th): break fast after sunrise with Parana.",
        descriptionHindi:
          "दशमी: एक बार भोजन सूर्यास्त से पहले। एकादशी: निर्जल या फलाहार व्रत। द्वादशी: सूर्योदय के बाद पारण से व्रत खोलें।",
      },
      {
        id: "ws-07-s4",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.18 0.08 152) 0%, oklch(0.25 0.12 145) 100%)",
        title: "24 Ekadashis",
        titleHindi: "24 एकादशियाँ",
        description:
          "Each Ekadashi has a unique name and story: Nirjala, Vaikunta, Devshayani, Devutthana, Mokshada, Pausha Putrada, Kamada, Papamochani and more.",
        descriptionHindi:
          "निर्जला, वैकुंठ, देवशयनी, देवोत्थान, मोक्षदा, पुत्रदा, कामदा, पापमोचनी — प्रत्येक एकादशी का विशेष नाम और कथा है।",
      },
      {
        id: "ws-07-s5",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.28 0.14 142) 0%, oklch(0.20 0.10 150) 100%)",
        title: "Nirjala Ekadashi",
        titleHindi: "निर्जला एकादशी",
        description:
          "Nirjala Ekadashi (Jyeshtha Shukla 11th) is the most powerful — a waterless fast that grants the merit of all 24 Ekadashis combined.",
        descriptionHindi:
          "ज्येष्ठ शुक्ल एकादशी (निर्जला) सबसे कठिन और महाफलदायी — इस एक व्रत से सभी 24 एकादशियों का पुण्य मिलता है।",
      },
      {
        id: "ws-07-s6",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.12 146) 0%, oklch(0.18 0.08 154) 100%)",
        title: "Health Benefits",
        titleHindi: "स्वास्थ्य लाभ",
        description:
          "Modern science confirms that regular 24-hour fasts reset the gut microbiome, trigger cellular autophagy (self-cleaning), and improve metabolic health.",
        descriptionHindi:
          "आधुनिक विज्ञान पुष्टि करता है: नियमित 24 घंटे उपवास से आंत माइक्रोबायोम रीसेट, कोशिकीय स्वयंशोधन (ऑटोफेजी) और चयापचय में सुधार।",
      },
    ],
  },
  {
    id: "ws-08",
    title: "Paryushana: The Jain Festival of Forgiveness",
    titleHindi: "पर्युषण: क्षमा का जैन पर्व",
    category: "vrat",
    thumbnail: "/assets/stories/paryushana-thumb.jpg",
    bgColor: "oklch(0.18 0.06 218)",
    isPublished: true,
    createdAt: 1741400000000,
    updatedAt: 1741400000000,
    slides: [
      {
        id: "ws-08-s1",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.18 0.08 220) 0%, oklch(0.25 0.10 215) 100%)",
        title: "Paryushana Parva",
        titleHindi: "पर्युषण पर्व",
        description:
          "The most sacred Jain festival of self-reflection, austerity, and forgiveness. Shvetambaras observe 8 days; Digambaras observe Das Lakshana for 10 days.",
        descriptionHindi:
          "आत्म-चिंतन, तपश्चर्या और क्षमा का सबसे पवित्र जैन पर्व। श्वेतांबर 8 दिन, दिगंबर 10 दिन (दशलक्षण)।",
      },
      {
        id: "ws-08-s2",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.10 215) 0%, oklch(0.18 0.06 222) 100%)",
        title: "Atthai Tapa",
        titleHindi: "अट्ठाई तप",
        description:
          "Many devoted Jains observe Atthai — an 8-day complete fast consuming only boiled water, accompanied by scripture study and meditation.",
        descriptionHindi:
          "श्रद्धालु जैन अट्ठाई तप करते हैं — 8 दिन केवल उबला पानी, साथ में शास्त्र अध्ययन और ध्यान।",
      },
      {
        id: "ws-08-s3",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.20 0.08 218) 0%, oklch(0.28 0.12 210) 100%)",
        title: "Kalpa Sutra Recitation",
        titleHindi: "कल्पसूत्र वाचन",
        description:
          "The Kalpa Sutra, containing life stories of Tirthankaras, is recited daily. On Day 3, the Janma Kalyanak of Lord Mahavira is joyfully celebrated.",
        descriptionHindi:
          "कल्पसूत्र में तीर्थंकरों के जीवन चरित्र प्रतिदिन सुनाए जाते हैं। तीसरे दिन महावीर स्वामी के जन्म कल्याणक का उत्सव।",
      },
      {
        id: "ws-08-s4",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.25 0.12 212) 0%, oklch(0.18 0.08 220) 100%)",
        title: "Samvatsari: Universal Forgiveness",
        titleHindi: "संवत्सरी: सार्वभौमिक क्षमा",
        description:
          'The final day — Samvatsari — is the holiest. Jains ask forgiveness from every being: "Micchami Dukkadam" (May my wrongs be forgiven).',
        descriptionHindi:
          'अंतिम दिन संवत्सरी पर प्रत्येक प्राणी से क्षमा माँगी जाती है: "मिच्छामि दुक्कड़म्" — मेरे अपराध क्षमा हों।',
      },
      {
        id: "ws-08-s5",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.18 0.06 218) 0%, oklch(0.26 0.10 208) 100%)",
        title: "Pratikraman",
        titleHindi: "प्रतिक्रमण",
        description:
          "Pratikraman is the ritual of repentance — reviewing one's faults, asking forgiveness of all beings, and resolving to improve. Performed twice daily during Paryushana.",
        descriptionHindi:
          "प्रतिक्रमण में स्वयं के दोषों की समीक्षा, सभी से क्षमा और सुधार का संकल्प। पर्युषण में प्रतिदिन दो बार किया जाता है।",
      },
      {
        id: "ws-08-s6",
        imageUrl: "",
        bgColor:
          "linear-gradient(160deg, oklch(0.22 0.10 215) 0%, oklch(0.18 0.06 225) 100%)",
        title: "Why It Matters",
        titleHindi: "यह क्यों महत्वपूर्ण है",
        description:
          "Paryushana teaches that inner purity — through fasting, study, and forgiveness — is the true path to liberation (moksha), not external rituals alone.",
        descriptionHindi:
          "पर्युषण सिखाता है: बाहरी आडंबर नहीं, उपवास-स्वाध्याय-क्षमा से भीतरी शुद्धि ही मोक्ष का मार्ग है।",
      },
    ],
  },
];
