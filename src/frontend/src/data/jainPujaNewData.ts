// ─── Jain Puja New Data ───────────────────────────────────────────────────────

export interface BhavnaVerse {
  number: number;
  hindi: string;
  roman: string;
  english: string;
}

export interface Tirtha {
  number: number;
  name: string;
  nameHindi: string;
  significance: string;
}

export interface MahaArghya {
  title: string;
  intro: string;
  tirthas: Tirtha[];
  mainMantra: string;
  procedureNote: string;
}

export interface PujaPlaceholder {
  title: string;
  status: "coming-soon";
  description: string;
}

// ─── Meri Bhavna — 11 Verses ─────────────────────────────────────────────────

export const meriBhavnaData: BhavnaVerse[] = [
  {
    number: 1,
    hindi: "सर्वे जीवा सुखी होवें, सर्वे पाप-विमुक्त होवें।",
    roman: "Sarve jeeva sukhi hoven, sarve paap-vimukt hoven.",
    english: "May all beings be happy, may all beings be free from sin.",
  },
  {
    number: 2,
    hindi: "जब तक मैं संसार में हूं, तब तक अहिंसा का पालन करूंगा।",
    roman: "Jab tak main sansaar mein hoon, tab tak ahimsa ka paalan karunga.",
    english: "As long as I am in this world, I will practice non-violence.",
  },
  {
    number: 3,
    hindi: "मैत्री सब जीवों से करूंगा, प्रमोद ज्ञानियों से करूंगा।",
    roman: "Maitri sab jeevon se karunga, pramod jnanion se karunga.",
    english:
      "I will have friendship with all beings, and joy in those who are wise.",
  },
  {
    number: 4,
    hindi: "करुणा दुखियों पर करूंगा, माध्यस्थ्य दुर्जनों पर रखूंगा।",
    roman: "Karuna dukhiyon par karunga, madhyastha durjanon par rakhunga.",
    english:
      "I will have compassion for the suffering, and equanimity toward the wicked.",
  },
  {
    number: 5,
    hindi: "मैं सम्यक् दर्शन का पालन करूंगा, सम्यक् ज्ञान का अनुशरण करूंगा।",
    roman:
      "Main samyak darshan ka paalan karunga, samyak gyan ka anusharan karunga.",
    english: "I will follow right belief, and follow right knowledge.",
  },
  {
    number: 6,
    hindi: "सम्यक् चारित्र को अपनाऊंगा, मोक्ष के मार्ग पर चलूंगा।",
    roman: "Samyak charitra ko apnaunga, moksha ke maarg par chalunga.",
    english: "I will adopt right conduct, and walk the path toward liberation.",
  },
  {
    number: 7,
    hindi: "जिन भगवान की भक्ति करूंगा, गुरुजन की सेवा करूंगा।",
    roman: "Jin Bhagwan ki bhakti karunga, gurujan ki seva karunga.",
    english: "I will devote myself to the Jina, and serve the teachers.",
  },
  {
    number: 8,
    hindi: "परिग्रह से मुक्त होने का प्रयास करूंगा, वीतराग पथ पर चलूंगा।",
    roman:
      "Parigraha se mukt hone ka prayas karunga, vitaraag path par chalunga.",
    english:
      "I will strive to be free from possessiveness, and walk the detached path.",
  },
  {
    number: 9,
    hindi: "क्रोध मान माया लोभ को त्यागूंगा, क्षमा मार्दव आर्जव सरलता को अपनाऊंगा।",
    roman:
      "Krodh maan maya lobha ko tyagunga, kshama mardava arjava saralta ko apnaunga.",
    english:
      "I will abandon anger, pride, deceit, and greed, and adopt forgiveness, humility, straightforwardness, and simplicity.",
  },
  {
    number: 10,
    hindi: "इस भव में पुरुषार्थ करूंगा, आत्मा की उन्नति के लिए जीऊंगा।",
    roman: "Is bhav mein purushaarth karunga, aatma ki unnati ke liye jiuunga.",
    english:
      "I will strive in this life, and live for the elevation of the soul.",
  },
  {
    number: 11,
    hindi:
      "ॐ सर्वे जीवा सुखी होवें, ॐ सर्वे जीवा निरामय होवें। सर्वे भद्राणि पश्यंतु, मा कश्चिद् दुःखमाप्नुयात्।",
    roman:
      "Om sarve jeeva sukhi hoven, om sarve jeeva niraamaya hoven. Sarve bhadrani pashyantu, ma kashchid dukhamapnuyat.",
    english:
      "May all beings be happy, may all beings be free from disease. May all see only goodness, may no one obtain sorrow.",
  },
];

// ─── Maha Arghya ──────────────────────────────────────────────────────────────

export const mahaArghyaData: MahaArghya = {
  title: "महा अर्घ्य",
  intro:
    "This Maha Arghya is offered to all the sacred Jain tirthas (pilgrimage sites) around the world. It is the culminating offering in major Jain puja ceremonies.",
  tirthas: [
    {
      number: 1,
      name: "Sammed Shikhar",
      nameHindi: "सम्मेद शिखर",
      significance:
        "20 Tirthankaras attained moksha here — the most sacred Jain pilgrimage site.",
    },
    {
      number: 2,
      name: "Pawapuri",
      nameHindi: "पावापुरी",
      significance:
        "भगवान महावीर का निर्वाण स्थल — the place where Mahavir Swami attained moksha.",
    },
    {
      number: 3,
      name: "Champapur",
      nameHindi: "चम्पापुर",
      significance: "12वें तीर्थंकर वासुपूज्य का जन्म स्थान।",
    },
    {
      number: 4,
      name: "Rajgriha",
      nameHindi: "राजगृह",
      significance:
        "भगवान महावीर का प्रवास स्थान — King Shrenik's capital and Mahavir's frequent abode.",
    },
    {
      number: 5,
      name: "Vaishali (Kundalapur)",
      nameHindi: "वैशाली (कुण्डलपुर)",
      significance:
        "भगवान महावीर का जन्म स्थान — birthplace of the 24th Tirthankar.",
    },
    {
      number: 6,
      name: "Shravasti",
      nameHindi: "श्रावस्ती",
      significance:
        "प्राचीन जैन तीर्थ — ancient Jain sacred site associated with several Tirthankaras.",
    },
    {
      number: 7,
      name: "Mathura",
      nameHindi: "मथुरा",
      significance:
        "जैन तीर्थ — important Jain archaeological site with ancient temples.",
    },
    {
      number: 8,
      name: "Kaushambi",
      nameHindi: "कौशाम्बी",
      significance:
        "भगवान पद्मप्रभु का जन्म स्थान — birthplace of the 6th Tirthankar Padmaprabhu.",
    },
    {
      number: 9,
      name: "Varanasi",
      nameHindi: "वाराणसी",
      significance:
        "भगवान पार्श्वनाथ का जन्म और मोक्ष स्थान — birth and liberation site of Parshvanath.",
    },
    {
      number: 10,
      name: "Hastinapur",
      nameHindi: "हस्तिनापुर",
      significance:
        "जैन तीर्थ — ancient Jain temple complex, associated with several Tirthankaras.",
    },
    {
      number: 11,
      name: "Ayodhya",
      nameHindi: "अयोध्या",
      significance:
        "भगवान ऋषभदेव का जन्म स्थान — birthplace of the first Tirthankar Rishabhdeva.",
    },
    {
      number: 12,
      name: "Shatrunjaya (Palitana)",
      nameHindi: "शत्रुंजय (पालिताना)",
      significance:
        "अनंत सिद्धों का मोक्ष स्थान — mountain of 900+ Jain temples, where countless souls attained moksha.",
    },
    {
      number: 13,
      name: "Girnar",
      nameHindi: "गिरनार",
      significance:
        "नेमिनाथ भगवान का मोक्ष स्थान — where the 22nd Tirthankar Neminath attained liberation.",
    },
    {
      number: 14,
      name: "Abu (Dilwara)",
      nameHindi: "आबू (दिलवाड़ा)",
      significance:
        "विश्व प्रसिद्ध जैन मंदिर — the world-famous Dilwara marble temples.",
    },
    {
      number: 15,
      name: "Ranakpur",
      nameHindi: "रणकपुर",
      significance:
        "चतुर्मुख आदिनाथ मंदिर — the stunning four-faced Adinath temple with 1444 carved pillars.",
    },
    {
      number: 16,
      name: "Khajuraho",
      nameHindi: "खजुराहो",
      significance:
        "जैन मंदिर समूह — the Jain temple group at Khajuraho, a UNESCO World Heritage site.",
    },
    {
      number: 17,
      name: "Ellora",
      nameHindi: "एलोरा",
      significance:
        "जैन गुफा मंदिर — the remarkable Jain cave temples at Ellora, Maharashtra.",
    },
    {
      number: 18,
      name: "Shravanabelagola",
      nameHindi: "श्रवणबेलगोला",
      significance:
        "बाहुबली की विशाल प्रतिमा — home to the 57-foot monolithic statue of Bahubali.",
    },
    {
      number: 19,
      name: "Mudbidri",
      nameHindi: "मूडबिद्री",
      significance:
        "जैन तीर्थ — known as the 'Jain Kashi' of the South with 18 Jain basadis.",
    },
    {
      number: 20,
      name: "Mangi-Tungi",
      nameHindi: "मांगीतुंगी",
      significance:
        "जैन तीर्थ — home to the world's largest monolithic Rishabhdeva statue at 108 feet.",
    },
  ],
  mainMantra: "ॐ ह्रीं श्री समस्त-जैन-तीर्थेभ्यो महा-अर्घ्यं निर्वपामीति स्वाहा।",
  procedureNote:
    "This Maha Arghya is offered by filling an arghya vessel with water, saffron, sandalwood paste, rice, flowers, fruit, and cloves. The devotee recites the mantra while pouring the arghya into the ceremonial plate, visualizing all 20 tirthas in their mind.",
};

// ─── Placeholder Puja Entries ─────────────────────────────────────────────────

export const navgrahVratPujaData: PujaPlaceholder = {
  title: "नवग्रहशांति व्रत पूजा",
  status: "coming-soon",
  description: "नवग्रहों की शांति के लिए जैन विधि से पूजा — शीघ्र उपलब्ध होगा।",
};

export const nandishwarVratVidhiData: PujaPlaceholder = {
  title: "नंदीश्वर पंक्ति व्रत विधि",
  status: "coming-soon",
  description:
    "नंदीश्वर द्वीप के अष्टांहिक पर्व पर विशेष व्रत पूजा विधि — शीघ्र उपलब्ध होगा।",
};
