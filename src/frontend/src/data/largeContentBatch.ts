export interface ContentEntry {
  id: string;
  title: string;
  deity: string;
  faith: "Hindu";
  type: "Stotra" | "Kavach" | "Ashtakam" | "Stuti";
  category: string;
  text: string[];
  transliteration: string[];
  meaning: string;
  benefits: string[];
}

export const NEW_STOTRAS_BATCH12: ContentEntry[] = [
  {
    id: "hanuman-bahuk",
    title: "Hanuman Bahuk",
    deity: "Hanuman",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "श्री राम दूत अतुलित बल धामा।",
      "अंजनि-पुत्र पवनसुत नामा॥",
      "महावीर विक्रम बजरंगी॥",
    ],
    transliteration: [
      "Shri Ram doot itulit bal dhama.",
      "Anjani-putra pavansut nama.",
      "Mahaveer vikram bajrangi.",
    ],
    meaning:
      "Tulsidas prayer to Hanuman for relief from arm pain and seeking divine grace",
    benefits: ["Strength", "Courage", "Protection from disease"],
  },
  {
    id: "shiv-mahimna",
    title: "Shiv Mahimna Stotra",
    deity: "Shiva",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "महिम्नः पारं ते परम विदुषो यद्यसदृशी।",
      "स्तुतिर्ब्रह्मादीनामपि तदवसन्नास्त्ववनिधे॥",
      "नमस्ते महादेव जगदभिरामाय नमः॥",
    ],
    transliteration: [
      "Mahimnah param te param vidusho yadyasadrishi.",
      "Stutirbrahmadinamapi tadavasannastvavanidhe.",
      "Namaste mahadeva jagadabhiramaya namah.",
    ],
    meaning:
      "Pushpadanta glorifies Shiva whose greatness surpasses the understanding of even Brahma and Vishnu",
    benefits: [
      "Liberation from sins",
      "Divine wisdom",
      "Fulfillment of desires",
    ],
  },
  {
    id: "mahamrityunjaya-extended",
    title: "Mahamrityunjaya Extended Stotra",
    deity: "Shiva",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।",
      "उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
      "नमः शिवाय शान्ताय ब्रह्मणे परमात्मने॥",
    ],
    transliteration: [
      "Om tryambakam yajamahey sugandhim pushtivardhanam.",
      "Urvarukamiva bandhanat mrityormukshiya maAmritat.",
      "Namah shivaya shantaya brahmanay paramatmane.",
    ],
    meaning:
      "Extended worship of the three-eyed Shiva who nourishes all beings and liberates from the cycle of death",
    benefits: [
      "Protection from death",
      "Health and healing",
      "Spiritual liberation",
    ],
  },
  {
    id: "daridrya-dahan-shiv",
    title: "Daridrya Dahan Shiv Stotra",
    deity: "Shiva",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "विश्वेश्वराय नरकार्णव तारणाय।",
      "कर्णामृताय शशिशेखर धारणाय॥",
      "कर्पूरकान्तिधवलाय जटाधराय॥",
    ],
    transliteration: [
      "Vishveshvaraya narakarnava taranaya.",
      "Karnamritaya shashishekhar dharanaya.",
      "Karpoorakantidhavalaya jatadhara.",
    ],
    meaning:
      "Stotra to Shiva destroyer of poverty, praising him as the Lord of the Universe who removes all suffering",
    benefits: [
      "Removal of poverty",
      "Wealth and prosperity",
      "Destruction of sins",
    ],
  },
  {
    id: "govind-damodar",
    title: "Govind Damodar Stotra",
    deity: "Krishna",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "कस्तूरी तिलकं ललाट पटले वक्षःस्थले कौस्तुभम्।",
      "नासाग्रे वर मौक्तिकं करतले वेणुः करे कंकणम्॥",
      "गोविन्द दामोदर माधवेति॥",
    ],
    transliteration: [
      "Kasturi tilakam lalata patale vakshahsthale kaustubham.",
      "Nasagre vara mauktikam karatale venuh kare kankanam.",
      "Govinda Damodara Madhaveti.",
    ],
    meaning:
      "Devotional hymn describing the beautiful form of Lord Krishna adorned with kasturi tilak and Kaustubha gem",
    benefits: ["Devotion", "Inner bliss", "Liberation through love"],
  },
  {
    id: "mangal-stotra",
    title: "Mangal Stotra",
    deity: "Mangal",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "धरणीगर्भसंभूतं विद्युत्कान्तिसमप्रभम्।",
      "कुमारं शक्तिहस्तं च मङ्गलं प्रणमाम्यहम्॥",
      "नमः कुजाय भौमाय नमस्ते रक्तवर्णिने॥",
    ],
    transliteration: [
      "Dharanigarbhasambhutam vidyutkantasamaprabham.",
      "Kumaram shaktihastam cha mangalam pranamaham.",
      "Namah kujaya bhaumaya namaste raktavarninay.",
    ],
    meaning:
      "Praise to Mangal (Mars), born of the Earth, shining like lightning, holding the spear of power",
    benefits: [
      "Courage and valor",
      "Victory over enemies",
      "Reduction of Mars malefic effects",
    ],
  },
  {
    id: "surya-hriday",
    title: "Surya Hridayam",
    deity: "Surya",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम्।",
      "रावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम्॥",
      "आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम्॥",
    ],
    transliteration: [
      "Tato yuddhaparishrantam samare chintaya sthitam.",
      "Ravanam chagrato drishtva yuddhaya samupasthitam.",
      "Adityahridayam punyam sarvashatruviashanam.",
    ],
    meaning:
      "Agastya Muni reveals the sacred Surya Hridaya to Ram before the battle with Ravana, invoking solar power",
    benefits: [
      "Victory in battles",
      "Destruction of enemies",
      "Divine solar energy",
    ],
  },
  {
    id: "dattatreya-stotram",
    title: "Dattatreya Stotram",
    deity: "Dattatreya",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "जटाधरं पाण्डुरांगं शूलहस्तं कृपानिधिम्।",
      "सर्वरोगहरं देवं दत्तात्रेयमहं भजे॥",
      "ॐ द्रां दत्तात्रेयाय नमः॥",
    ],
    transliteration: [
      "Jatadharam pandurangam shulahastam kriipanidhim.",
      "Sarvarogaharam devam dattatreyamaham bhaje.",
      "Om dram dattatreyaya namah.",
    ],
    meaning:
      "Devotional hymn to Dattatreya, the three-headed Lord, who removes all diseases and grants supreme wisdom",
    benefits: [
      "Removal of diseases",
      "Spiritual wisdom",
      "Fulfillment of all wishes",
    ],
  },
  {
    id: "narasimha-stotram",
    title: "Narasimha Stotram",
    deity: "Narasimha",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम्।",
      "नृसिंहं भीषणं भद्रं मृत्युमृत्युं नमाम्यहम्॥",
      "ॐ नमो भगवते नृसिंहाय॥",
    ],
    transliteration: [
      "Ugram viram mahavishnum jvalantam sarvatomukham.",
      "Nrisimham bhishanam bhadram mrityumrityum namaham.",
      "Om namo bhagavate nrisimhaya.",
    ],
    meaning:
      "Salutation to the ferocious and auspicious Narasimha, the man-lion form of Vishnu who conquers death itself",
    benefits: ["Protection from evil", "Fearlessness", "Victory over darkness"],
  },
  {
    id: "mahalakshmi-hriday",
    title: "Mahalakshmi Hridayam",
    deity: "Lakshmi",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "नमस्ते सर्वदेवानां वरदासि हरिप्रिये।",
      "या गतिस्त्वत्प्रपन्नानां सा मे भूयात्त्वदर्चनात्॥",
      "ॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः॥",
    ],
    transliteration: [
      "Namaste sarvadevanaṁ varadasi haripriye.",
      "Ya gatistvatprapannanam sa me bhuyattvadarchanat.",
      "Om shrim hrim shrim mahalakshmyai namah.",
    ],
    meaning:
      "Hymn to the heart of Mahalakshmi, the beloved of Hari who grants boons to all devoted beings",
    benefits: [
      "Wealth and abundance",
      "Spiritual grace",
      "Blessings of the Divine Mother",
    ],
  },
  {
    id: "markandey-mrityunjay",
    title: "Markandey Maha Mrityunjay Stotra",
    deity: "Shiva",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "मृत्युञ्जयाय रुद्राय नीलकण्ठाय शम्भवे।",
      "अमृतेशाय शर्वाय महादेवाय ते नमः॥",
      "त्रयम्बकेश्वर देव पाहि मां महाकालेश्वर॥",
    ],
    transliteration: [
      "Mrityunjayaya rudraya nilakantaya shambhave.",
      "Amriteshaya sharvaya mahadevaya te namah.",
      "Trayambakeshvara deva pahi mam mahakaleshuara.",
    ],
    meaning:
      "Markandeya's prayer to Shiva the conqueror of death, the blue-throated Rudra, to grant immortality",
    benefits: [
      "Victory over death",
      "Liberation from fear",
      "Divine protection",
    ],
  },
  {
    id: "lalita-panchakam",
    title: "Lalita Panchakam",
    deity: "Lalita",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "प्रातः स्मरामि ललिताम् इह सर्वमाताम्।",
      "स्वच्छन्दरूपामनघां महाभयहराम्॥",
      "श्री ललितायै नमो नमः॥",
    ],
    transliteration: [
      "Pratah smarami lalitam iha sarvamataṁ.",
      "Svachchhandarupam anagham mahabhayaharam.",
      "Shri lalitayai namo namah.",
    ],
    meaning:
      "Five-verse morning prayer to Lalita Devi, the mother of the universe, who dispels all great fears",
    benefits: ["Divine grace", "Removal of fear", "Spiritual awakening"],
  },
  {
    id: "batuk-bhairav-ashtottar",
    title: "Batuk Bhairav Ashtottara Stotra",
    deity: "Bhairav",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "ॐ भैरवाय नमो नमः काशीक्षेत्रपालाय।",
      "नमो बटुकाय देवाय षट्त्रिंशत्स्वरूपिणे॥",
      "नमो अष्टोत्तर शताय महाभैरवाय ते नमः॥",
    ],
    transliteration: [
      "Om bhairavaya namo namah kashikshetrapallaya.",
      "Namo batukaya devaya shattrimshatyasvarupine.",
      "Namo ashtottara shataya mahabhairavaya te namah.",
    ],
    meaning:
      "108-name stotra to Batuk Bhairav, the protector of Kashi and the guardian against all negative forces",
    benefits: [
      "Protection from evil spirits",
      "Fearlessness",
      "Divine guardianship",
    ],
  },
  {
    id: "dwadash-jyotirlinga",
    title: "Dwadash Jyotirlinga Stotra",
    deity: "Shiva",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम्।",
      "उज्जयिन्यां महाकालमोंकारेममलेश्वरम्॥",
      "द्वादशैतानि नामानि प्रातरुत्थाय यः पठेत्॥",
    ],
    transliteration: [
      "Saurastre somanatham cha shrishaile mallikarjunam.",
      "Ujjayiniyam mahakaloṁkaremamaleshuaram.",
      "Dvadashaitani namani pratarutthaya yah pathet.",
    ],
    meaning:
      "Stotra naming all twelve Jyotirlingas of Shiva from Somnath to Ghrishneshwar, conferring merit equal to pilgrimage",
    benefits: [
      "Merit of all pilgrimages",
      "Shiva's blessings",
      "Liberation from rebirth",
    ],
  },
  {
    id: "ganesh-ashtottara",
    title: "Ganesh Ashtottara Shatanamavali",
    deity: "Ganesha",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "गजाननं भूतगणादिसेवितं कपित्थजम्बूफलसारभक्षणम्।",
      "उमासुतं शोकविनाशकारणं नमामि विघ्नेश्वरपादपङ्कजम्॥",
      "ॐ गणेशाय नमः॥",
    ],
    transliteration: [
      "Gajananam bhutaganadi sevitam kapitthajambuphalasarabakkshanam.",
      "Umasutam shokavinashakaaranam namami vighneshvarapadapankajam.",
      "Om ganeshaya namah.",
    ],
    meaning:
      "108 names of Ganesha, the elephant-headed son of Uma, worshipped by all beings for removal of obstacles",
    benefits: [
      "Removal of obstacles",
      "Success in new ventures",
      "Auspicious beginnings",
    ],
  },
  {
    id: "guru-stotram",
    title: "Guru Stotra (Gurvashtakam)",
    deity: "Guru",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "शरीरं सुरूपं तथा वा कलत्रं यशश्चारु चित्रं धनं मेरुतुल्यम्।",
      "मनश्चेन्न लग्नं गुरोरंघ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥",
      "गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः॥",
    ],
    transliteration: [
      "Shariram surupam tatha va kalatram yashasharu chitram dhanam merutulyam.",
      "Manashcen na lagnam guroranghripadme tatah kim tatah kim tatah kim tatah kim.",
      "Gurur brahma gururvishnuh gururdevo maheshvarah.",
    ],
    meaning:
      "Eight verses on the Guru principle — without devotion to the Guru's lotus feet, all worldly achievements are meaningless",
    benefits: ["Spiritual wisdom", "Guru's grace", "Liberation from illusion"],
  },
  {
    id: "angaraka-stotra",
    title: "Angaraka Stotra",
    deity: "Mangal",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "अङ्गारकोऽयं रुधिरांशुकश्च भूमिसुतो भौम उदारशक्तिः।",
      "लोहितवर्णः शुभदस्सुरेज्यो विवाहकृत् सौम्यवधूसुखाय॥",
      "नमो भौमाय कुजाय मंगलाय नमो नमः॥",
    ],
    transliteration: [
      "Angarakoyam rudhiramshukashcha bhumisuto bhauma udarashaktih.",
      "Lohitavarnam shubhadas surejyo vivahakrit saumyavadhusukhaya.",
      "Namo bhaumaya kujaya mangalaya namo namah.",
    ],
    meaning:
      "Praise to Angaraka (Mars) born of the Earth, red-hued, auspicious, who grants happiness in marriage",
    benefits: [
      "Marital happiness",
      "Courage in action",
      "Reduction of Mars doshas",
    ],
  },
  {
    id: "indra-krit-ram",
    title: "Indra Krit Shri Ram Stotra",
    deity: "Ram",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "राजाधिराजाय प्रसह्यसाहिने नमो वयं वैश्रवणाय कुर्महे।",
      "स मे कामान्कामकामाय मह्यं कामेश्वरो वैश्रवणो ददातु॥",
      "श्री राम राम रामेति रमे रामे मनोरमे॥",
    ],
    transliteration: [
      "Rajadhirajaya prasahyasahinay namo vayam vaishravanaya kurmahe.",
      "Sa me kaman kamakamaya mahyam kameshvaro vaishravano dadatu.",
      "Shri ram ram rameti rame rame manorame.",
    ],
    meaning:
      "Stotra by Indra praising Lord Rama as the king of kings who fulfills all desires of devoted beings",
    benefits: [
      "Fulfillment of desires",
      "Victory over adversaries",
      "Divine sovereignty",
    ],
  },
  {
    id: "chandra-stotra",
    title: "Chandra Stotra",
    deity: "Chandra",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "ददिशंखतुषाराभं क्षीरोदार्णवसंभवम्।",
      "नमामि शशिनं भक्त्या शम्भोर्मुकुटभूषणम्॥",
      "नमो नमः चन्द्राय सोमाय शीतलाय नमः॥",
    ],
    transliteration: [
      "Dadishankhatusharabham kshirodarnava sambhavam.",
      "Namami shashinam bhaktya shambhormukutabhushanam.",
      "Namo namah chandraya somaya shitalaya namah.",
    ],
    meaning:
      "Hymn to the Moon born from the ocean of milk, adorned on Shiva's crown, cooling and nourishing all beings",
    benefits: ["Peace of mind", "Emotional balance", "Healing of lunar doshas"],
  },
  {
    id: "mahakaal-stotra",
    title: "Mahakaal Stotra",
    deity: "Shiva",
    faith: "Hindu",
    type: "Stotra",
    category: "Stotra",
    text: [
      "महाकालाय नमस्तुभ्यं महाकालाय नमो नमः।",
      "कालस्य कालाय महेश्वराय नमः॥",
      "ॐ नमः शिवाय महाकालेश्वराय॥",
    ],
    transliteration: [
      "Mahakalaya namastubhyam mahakalaya namo namah.",
      "Kalasya kalaya maheshvaraya namah.",
      "Om namah shivaya mahakaleshuaraya.",
    ],
    meaning:
      "Devotional stotra to Mahakaal, the great lord of time and death, the ultimate transcendent form of Shiva in Ujjain",
    benefits: [
      "Conquest of time and death",
      "Liberation from karmic cycles",
      "Supreme protection",
    ],
  },
];

export const NEW_KAVACHS_BATCH12: ContentEntry[] = [];
export const NEW_ASHTAKAMS_BATCH12: ContentEntry[] = [];
export const NEW_STUTIS_BATCH12: ContentEntry[] = [];
