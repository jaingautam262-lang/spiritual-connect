export interface GitaChapterFull {
  id: number;
  slug: string;
  name: string;
  nameHindi: string;
  sankhyaName: string;
  sankhyaNameDevanagari: string;
  verseCount: number;
  summary: string;
  summaryHindi: string;
  keyVerse: { sanskrit: string; transliteration: string; meaning: string };
  themes: string[];
}

export const bhagavadGitaChapters: GitaChapterFull[] = [
  {
    id: 1,
    slug: "chapter-1",
    name: "Arjuna's Dilemma",
    nameHindi: "अर्जुन का विषाद",
    sankhyaName: "Arjuna Vishada Yoga",
    sankhyaNameDevanagari: "अर्जुन विषाद योग",
    verseCount: 47,
    summary:
      "The Bhagavad Gita begins on the battlefield of Kurukshetra. Arjuna, the mighty warrior, sees his relatives, teachers, and friends on both sides and is overcome with grief and confusion. He drops his bow and refuses to fight. This chapter establishes the fundamental human dilemma — the conflict between duty and emotion.",
    summaryHindi:
      "भगवद्गीता का आरंभ कुरुक्षेत्र के युद्धक्षेत्र पर होता है। महान योद्धा अर्जुन दोनों पक्षों में अपने सगे-संबंधियों, गुरुओं और मित्रों को देखकर शोक और विषाद से भर जाते हैं। वे धनुष छोड़ देते हैं और युद्ध करने से मना कर देते हैं। यह अध्याय कर्तव्य और भावना के बीच मौलिक मानवीय द्वंद्व को स्थापित करता है।",
    keyVerse: {
      sanskrit: "अहो बत महत्पापं कर्तुं व्यवसिता वयम्",
      transliteration: "aho bata mahat pāpam kartum vyavasitā vayam",
      meaning:
        "Alas, how strange it is that we have set out to commit a great sin.",
    },
    themes: ["Grief", "Duty vs Emotion", "Attachment", "Battlefield"],
  },
  {
    id: 2,
    slug: "chapter-2",
    name: "The Yoga of Knowledge",
    nameHindi: "ज्ञान का योग",
    sankhyaName: "Sankhya Yoga",
    sankhyaNameDevanagari: "सांख्य योग",
    verseCount: 72,
    summary:
      "Chapter 2 is often called the summary of the entire Gita. Krishna begins His teaching by addressing the nature of the soul — that it is eternal, indestructible, and beyond birth and death. He introduces the concept of Nishkama Karma (selfless action) and establishes the philosophical foundation for all subsequent teachings.",
    summaryHindi:
      "अध्याय 2 को प्रायः सम्पूर्ण गीता का सार कहा जाता है। कृष्ण आत्मा की शाश्वत, अविनाशी और जन्म-मृत्यु से परे प्रकृति को समझाकर अपना उपदेश आरंभ करते हैं। वे निष्काम कर्म की अवधारणा और सभी आगामी शिक्षाओं की दार्शनिक नींव स्थापित करते हैं।",
    keyVerse: {
      sanskrit: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः",
      transliteration: "nainaṁ chindanti śastrāṇi nainaṁ dahati pāvakaḥ",
      meaning:
        "The soul can never be cut to pieces by any weapon, nor burned by fire.",
    },
    themes: [
      "Immortal Soul",
      "Nishkama Karma",
      "Sthitaprajna",
      "Self-Knowledge",
    ],
  },
  {
    id: 3,
    slug: "chapter-3",
    name: "The Yoga of Action",
    nameHindi: "कर्म का योग",
    sankhyaName: "Karma Yoga",
    sankhyaNameDevanagari: "कर्म योग",
    verseCount: 43,
    summary:
      "Krishna explains why action is superior to inaction. He introduces Nishkama Karma — selfless action without attachment to results. He teaches that all beings must act according to their nature (svabhava) and duty (svadharma), and that action performed as an offering to the Divine purifies the soul.",
    summaryHindi:
      "कृष्ण बताते हैं कि निष्क्रियता की अपेक्षा कर्म श्रेष्ठ है। वे निष्काम कर्म सिखाते हैं — फल की आसक्ति के बिना निःस्वार्थ कर्म। वे समझाते हैं कि सभी प्राणियों को अपने स्वभाव और स्वधर्म के अनुसार कर्म करना चाहिए, और परमात्मा को अर्पित कर्म आत्मा को शुद्ध करता है।",
    keyVerse: {
      sanskrit: "नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः",
      transliteration: "niyataṁ kuru karma tvaṁ karma jyāyo hy akarmaṇaḥ",
      meaning:
        "Perform your prescribed duty, for action is better than inaction.",
    },
    themes: ["Selfless Action", "Svadharma", "Yajna", "Duty"],
  },
  {
    id: 4,
    slug: "chapter-4",
    name: "Knowledge and Renunciation of Action",
    nameHindi: "ज्ञान और कर्म संन्यास",
    sankhyaName: "Jnana Karma Sanyasa Yoga",
    sankhyaNameDevanagari: "ज्ञान कर्म संन्यास योग",
    verseCount: 42,
    summary:
      "Krishna reveals the ancient lineage of Gita's wisdom and His divine incarnations. He teaches that true knowledge destroys the bondage of karma and that action performed with knowledge becomes a sacrifice that liberates the soul.",
    summaryHindi:
      "कृष्ण इस ज्ञान की प्राचीन परंपरा और अपने दिव्य अवतारों का रहस्य प्रकट करते हैं। वे सिखाते हैं कि सच्चा ज्ञान कर्म के बंधन को नष्ट कर देता है और ज्ञानपूर्वक किया गया कर्म एक यज्ञ बन जाता है जो आत्मा को मुक्त करता है।",
    keyVerse: {
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत",
      transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata",
      meaning:
        "Whenever there is decline in righteousness and rise of unrighteousness, O Bharata, I manifest Myself.",
    },
    themes: [
      "Divine Incarnation",
      "Avatar",
      "Knowledge as Liberation",
      "Yajna",
    ],
  },
  {
    id: 5,
    slug: "chapter-5",
    name: "The Yoga of Renunciation",
    nameHindi: "संन्यास का योग",
    sankhyaName: "Karma Sanyasa Yoga",
    sankhyaNameDevanagari: "कर्म संन्यास योग",
    verseCount: 29,
    summary:
      "Krishna resolves the apparent conflict between renunciation of action and the yoga of action. True renunciation is not about avoiding action — it is about acting without ego and attachment. The wise person sees inaction in action and action in inaction.",
    summaryHindi:
      "कृष्ण कर्म-संन्यास और कर्मयोग के बीच के आभासी विरोधाभास को सुलझाते हैं। सच्चा संन्यास कर्म से बचना नहीं है — यह अहंकार और आसक्ति के बिना कर्म करना है। ज्ञानी व्यक्ति कर्म में अकर्म और अकर्म में कर्म देखता है।",
    keyVerse: {
      sanskrit: "सन्न्यासः कर्मयोगश्च निःश्रेयसकरावुभौ",
      transliteration: "sannyāsaḥ karmayogaś ca niḥśreyasakarāv ubhau",
      meaning:
        "Both renunciation and yoga of action lead to liberation; of the two, yoga of action is superior.",
    },
    themes: ["Renunciation", "Equal Vision", "Inner Freedom", "Liberation"],
  },
  {
    id: 6,
    slug: "chapter-6",
    name: "The Yoga of Meditation",
    nameHindi: "ध्यान का योग",
    sankhyaName: "Dhyana Yoga",
    sankhyaNameDevanagari: "ध्यान योग",
    verseCount: 47,
    summary:
      "Chapter 6 is the Gita's masterclass on meditation. Krishna describes the practice, posture, and mindset for meditation. He teaches that the mind is both the friend and enemy of the self — when controlled, it leads to liberation; when uncontrolled, it acts as the greatest foe.",
    summaryHindi:
      "अध्याय 6 गीता का ध्यान पर महान उपदेश है। कृष्ण ध्यान के अभ्यास, आसन और मनोभाव का वर्णन करते हैं। वे सिखाते हैं कि मन आत्मा का मित्र और शत्रु दोनों है — नियंत्रित होने पर मुक्ति की ओर ले जाता है, अनियंत्रित होने पर सबसे बड़ा शत्रु बन जाता है।",
    keyVerse: {
      sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्",
      transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet",
      meaning:
        "Let a man lift himself by his own Self alone; let him not lower himself, for he himself is his friend.",
    },
    themes: ["Meditation", "Mind Control", "Self-Mastery", "Dhyana"],
  },
  {
    id: 7,
    slug: "chapter-7",
    name: "Knowledge and Wisdom",
    nameHindi: "ज्ञान और विज्ञान",
    sankhyaName: "Jnana Vijnana Yoga",
    sankhyaNameDevanagari: "ज्ञान विज्ञान योग",
    verseCount: 30,
    summary:
      "Krishna reveals His divine nature and the two aspects of His energy — the material (lower) and spiritual (higher). He explains that everything in creation is His manifestation and that those who truly know Him understand the entire universe.",
    summaryHindi:
      "कृष्ण अपनी दिव्य प्रकृति और अपनी शक्ति के दो पक्षों को प्रकट करते हैं — भौतिक (निम्नतर) और आध्यात्मिक (उच्चतर)। वे समझाते हैं कि सृष्टि की प्रत्येक वस्तु उनकी अभिव्यक्ति है और जो उन्हें वास्तव में जानते हैं, वे समस्त ब्रह्मांड को समझते हैं।",
    keyVerse: {
      sanskrit: "मनुष्याणां सहस्रेषु कश्चिद्यतति सिद्धये",
      transliteration: "manuṣyāṇāṁ sahasreṣu kaścid yatati siddhaye",
      meaning:
        "Out of many thousands among men, one may endeavor for perfection.",
    },
    themes: [
      "Divine Nature",
      "Para/Apara Prakriti",
      "Universal Knowledge",
      "Rarity of Seekers",
    ],
  },
  {
    id: 8,
    slug: "chapter-8",
    name: "The Imperishable Absolute",
    nameHindi: "अक्षर ब्रह्म",
    sankhyaName: "Akshara Brahma Yoga",
    sankhyaNameDevanagari: "अक्षर ब्रह्म योग",
    verseCount: 28,
    summary:
      "Chapter 8 addresses what happens at death and how one's final thoughts determine the next destination. Krishna explains the imperishable nature of Brahman and the path to liberation.",
    summaryHindi:
      "अध्याय 8 में मृत्यु के समय क्या होता है और अंतिम विचार अगले गंतव्य को कैसे निर्धारित करते हैं, इसका वर्णन है। कृष्ण ब्रह्म की अविनाशी प्रकृति और मुक्ति के मार्ग का वर्णन करते हैं।",
    keyVerse: {
      sanskrit: "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्",
      transliteration: "antakāle ca mām eva smaran muktvā kalevaram",
      meaning:
        "Whoever, at the time of death, remembers Me alone, reaches My state.",
    },
    themes: ["Death & Rebirth", "Brahman", "Final Thoughts", "Devayana"],
  },
  {
    id: 9,
    slug: "chapter-9",
    name: "Royal Knowledge and Royal Secret",
    nameHindi: "राज विद्या राज रहस्य",
    sankhyaName: "Raja Vidya Raja Guhya Yoga",
    sankhyaNameDevanagari: "राज विद्या राज गुह्य योग",
    verseCount: 34,
    summary:
      "Chapter 9 reveals the most confidential knowledge of devotion. Krishna declares that He pervades the entire universe yet remains unattached. Pure devotion, even in small offerings, is accepted when given with love.",
    summaryHindi:
      "अध्याय 9 भक्ति का सर्वाधिक गोपनीय ज्ञान प्रकट करता है। कृष्ण घोषणा करते हैं कि वे समस्त ब्रह्मांड में व्याप्त हैं फिर भी आसक्तिरहित रहते हैं। प्रेम से अर्पित छोटी-सी भेंट — पत्र, पुष्प, फल या जल — को भी वे स्वीकार करते हैं।",
    keyVerse: {
      sanskrit: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति",
      transliteration: "patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati",
      meaning:
        "If one offers Me with love and devotion a leaf, a flower, a fruit, or water, I will accept it.",
    },
    themes: ["Devotion", "Divine Love", "Surrender", "Confidential Knowledge"],
  },
  {
    id: 10,
    slug: "chapter-10",
    name: "Divine Glories",
    nameHindi: "दिव्य विभूतियाँ",
    sankhyaName: "Vibhuti Yoga",
    sankhyaNameDevanagari: "विभूति योग",
    verseCount: 42,
    summary:
      "Krishna reveals His divine manifestations (Vibhutis) throughout creation. He is the best, the brightest, the most powerful in every category — showing Arjuna that all excellence is a spark of His divine glory.",
    summaryHindi:
      "कृष्ण सृष्टि में अपनी दिव्य विभूतियों (अभिव्यक्तियों) को प्रकट करते हैं। वे प्रत्येक श्रेणी में सर्वश्रेष्ठ, सर्वाधिक तेजस्वी और सर्वशक्तिमान हैं — यह अर्जुन को दिखाता है कि सभी उत्कृष्टता उनके दिव्य तेज की एक चिंगारी है।",
    keyVerse: {
      sanskrit: "यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा",
      transliteration: "yad yad vibhūtimat sattvaṁ śrīmad ūrjitam eva vā",
      meaning:
        "Whatever is glorious, prosperous, or powerful, know that to be born of a spark of My splendor.",
    },
    themes: [
      "Divine Manifestations",
      "Excellence",
      "God in Creation",
      "Vibhuti",
    ],
  },
  {
    id: 11,
    slug: "chapter-11",
    name: "Cosmic Vision",
    nameHindi: "विश्वरूप दर्शन",
    sankhyaName: "Vishwarupa Darshana Yoga",
    sankhyaNameDevanagari: "विश्वरूप दर्शन योग",
    verseCount: 55,
    summary:
      "Chapter 11 is the dramatic climax of the Gita. Arjuna asks to see Krishna's true cosmic form (Vishwarupa), and Krishna grants him divine vision. Arjuna witnesses the entire universe — all past, present, and future — within Krishna's infinite cosmic body.",
    summaryHindi:
      "अध्याय 11 गीता का नाटकीय चरमोत्कर्ष है। अर्जुन कृष्ण का वास्तविक विश्वरूप देखने की प्रार्थना करते हैं और कृष्ण उन्हें दिव्य दृष्टि प्रदान करते हैं। अर्जुन कृष्ण के अनंत विश्व-शरीर में समस्त भूत, वर्तमान और भविष्य का दर्शन करते हैं।",
    keyVerse: {
      sanskrit: "दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता",
      transliteration: "divi sūrya-sahasrasya bhaved yugapad utthitā",
      meaning:
        "If the splendor of a thousand suns were to blaze out at once in the sky, that might resemble the splendor of that Mighty Being.",
    },
    themes: ["Vishwarupa", "Cosmic Form", "Divine Vision", "Awe and Wonder"],
  },
  {
    id: 12,
    slug: "chapter-12",
    name: "Devotion",
    nameHindi: "भक्ति",
    sankhyaName: "Bhakti Yoga",
    sankhyaNameDevanagari: "भक्ति योग",
    verseCount: 20,
    summary:
      "Chapter 12 is the shortest yet one of the most beloved chapters. It answers who is the better devotee — one who worships the personal form of God (Saguna) or the formless Absolute (Nirguna). Krishna lovingly declares the qualities of his dearest devotees.",
    summaryHindi:
      "अध्याय 12 सबसे छोटा किंतु सर्वाधिक प्रिय अध्यायों में से एक है। यह प्रश्न का उत्तर देता है कि बेहतर भक्त कौन है — जो ईश्वर के साकार रूप (सगुण) की उपासना करता है या निर्गुण निराकार ब्रह्म की। कृष्ण प्रेमपूर्वक अपने प्रिय भक्तों के गुण बताते हैं।",
    keyVerse: {
      sanskrit: "ये तु सर्वाणि कर्माणि मयि सन्न्यस्य मत्पराः",
      transliteration: "ye tu sarvāṇi karmāṇi mayi sannyasya mat-parāḥ",
      meaning:
        "Those who offer all their actions to Me, regarding Me as the Supreme Goal, meditating on Me with undivided devotion — I rescue them from the ocean of death.",
    },
    themes: ["Bhakti", "Saguna vs Nirguna", "Ideal Devotee", "Love for God"],
  },
  {
    id: 13,
    slug: "chapter-13",
    name: "The Field and Its Knower",
    nameHindi: "क्षेत्र और क्षेत्रज्ञ",
    sankhyaName: "Kshetra Kshetragna Vibhaga Yoga",
    sankhyaNameDevanagari: "क्षेत्र क्षेत्रज्ञ विभाग योग",
    verseCount: 35,
    summary:
      "Chapter 13 distinguishes between the body (Kshetra — the field) and the soul (Kshetragna — the knower of the field). Krishna explains the elements that make up material existence and the qualities that lead to liberation.",
    summaryHindi:
      "अध्याय 13 शरीर (क्षेत्र) और आत्मा (क्षेत्रज्ञ) के बीच अंतर स्पष्ट करता है। कृष्ण भौतिक अस्तित्व के तत्वों और मुक्ति की ओर ले जाने वाले गुणों का वर्णन करते हैं।",
    keyVerse: {
      sanskrit: "इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते",
      transliteration: "idaṁ śarīraṁ kaunteya kṣetram ity abhidhīyate",
      meaning:
        "This body, O Arjuna, is called the field; the one who knows it is called the knower of the field.",
    },
    themes: [
      "Body vs Soul",
      "Kshetra-Kshetrajna",
      "Material Nature",
      "Self-Knowledge",
    ],
  },
  {
    id: 14,
    slug: "chapter-14",
    name: "Three Modes of Nature",
    nameHindi: "तीन गुण",
    sankhyaName: "Gunatraya Vibhaga Yoga",
    sankhyaNameDevanagari: "गुणत्रय विभाग योग",
    verseCount: 27,
    summary:
      "Chapter 14 explains the three gunas (modes of material nature) — Sattva (goodness), Rajas (passion), and Tamas (ignorance) — which bind the soul to the material world. The person who transcends the gunas attains liberation.",
    summaryHindi:
      "अध्याय 14 तीन गुणों (प्रकृति के स्वभाव) — सत्त्व (सात्विक), रजस (राजसिक) और तमस (तामसिक) — का वर्णन करता है जो आत्मा को भौतिक जगत से बांधते हैं। जो इन गुणों को पार कर जाता है, वह मोक्ष को प्राप्त होता है।",
    keyVerse: {
      sanskrit: "सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः",
      transliteration: "sattvaṁ rajas tama iti guṇāḥ prakṛti-sambhavāḥ",
      meaning:
        "Material nature consists of three modes — goodness, passion, and ignorance.",
    },
    themes: ["Three Gunas", "Sattva", "Rajas", "Tamas"],
  },
  {
    id: 15,
    slug: "chapter-15",
    name: "The Supreme Person",
    nameHindi: "पुरुषोत्तम",
    sankhyaName: "Purushottama Yoga",
    sankhyaNameDevanagari: "पुरुषोत्तम योग",
    verseCount: 20,
    summary:
      "Chapter 15 uses the metaphor of an eternal banyan tree (Ashvattha) to describe the material world, with roots above (in the divine) and branches below. One must cut this tree with the sword of detachment to reach the Supreme Person.",
    summaryHindi:
      "अध्याय 15 एक शाश्वत अश्वत्थ वृक्ष (पीपल) के रूपक का उपयोग भौतिक जगत का वर्णन करने के लिए करता है, जिसकी जड़ें ऊपर (दिव्य में) और शाखाएं नीचे हैं। परम पुरुष तक पहुंचने के लिए इस वृक्ष को वैराग्य की तलवार से काटना होगा।",
    keyVerse: {
      sanskrit: "ऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम्",
      transliteration: "ūrdhva-mūlam adhaḥ-śākham aśvatthaṁ prāhur avyayam",
      meaning:
        "There is a banyan tree which has its roots upward and its branches down, and the Vedic hymns are its leaves.",
    },
    themes: ["Purushottama", "Cosmic Tree", "Detachment", "Supreme Being"],
  },
  {
    id: 16,
    slug: "chapter-16",
    name: "Divine and Demoniac Natures",
    nameHindi: "दैवी और आसुरी प्रकृति",
    sankhyaName: "Daivasura Sampad Vibhaga Yoga",
    sankhyaNameDevanagari: "दैवासुर सम्पद् विभाग योग",
    verseCount: 24,
    summary:
      "Chapter 16 contrasts divine (Daivi) and demoniac (Asuri) qualities in human nature. Divine qualities include fearlessness, purity, charity, and self-control. Demoniac qualities include pride, arrogance, anger, and delusion.",
    summaryHindi:
      "अध्याय 16 मानव प्रकृति में दैवी और आसुरी गुणों की तुलना करता है। दैवी गुणों में निर्भयता, पवित्रता, दान और आत्मसंयम शामिल हैं। आसुरी गुणों में अभिमान, अहंकार, क्रोध और मोह शामिल हैं।",
    keyVerse: {
      sanskrit: "अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः",
      transliteration: "abhayaṁ sattva-saṁśuddhir jñāna-yoga-vyavasthitiḥ",
      meaning:
        "Fearlessness, purification of one's existence, cultivation of spiritual knowledge — these are the divine qualities.",
    },
    themes: [
      "Divine Qualities",
      "Demoniac Nature",
      "Ethics",
      "Dharma vs Adharma",
    ],
  },
  {
    id: 17,
    slug: "chapter-17",
    name: "Three Divisions of Faith",
    nameHindi: "श्रद्धा के तीन भेद",
    sankhyaName: "Shraddhatraya Vibhaga Yoga",
    sankhyaNameDevanagari: "श्रद्धात्रय विभाग योग",
    verseCount: 28,
    summary:
      "Chapter 17 classifies faith, food, worship, charity, and austerity according to the three gunas. Sattvic faith leads to worship of the divine, rajasic faith to wealth and power, and tamasic faith to dark forces.",
    summaryHindi:
      "अध्याय 17 तीन गुणों के अनुसार श्रद्धा, आहार, पूजा, दान और तपस्या का वर्गीकरण करता है। सात्विक श्रद्धा दिव्य की उपासना की ओर ले जाती है, राजसिक श्रद्धा धन और शक्ति की ओर, और तामसिक श्रद्धा अंधकार की शक्तियों की ओर।",
    keyVerse: {
      sanskrit: "ओम् तत् सत् इति निर्देशो ब्रह्मणस्त्रिविधः स्मृतः",
      transliteration: "oṁ tat sat iti nirdeśo brahmaṇas trividhaḥ smṛtaḥ",
      meaning:
        "Om, Tat, Sat — these three words represent the absolute truth of the Brahman.",
    },
    themes: ["Shraddha", "Three Gunas", "Worship", "Om Tat Sat"],
  },
  {
    id: 18,
    slug: "chapter-18",
    name: "Liberation Through Renunciation",
    nameHindi: "मोक्ष और संन्यास",
    sankhyaName: "Moksha Sanyasa Yoga",
    sankhyaNameDevanagari: "मोक्ष संन्यास योग",
    verseCount: 78,
    summary:
      "Chapter 18 is the grand conclusion of the Gita. Krishna summarizes all His teachings — renunciation, the three gunas, duty according to one's nature, the supreme secret of devotion, and the ultimate promise of liberation to those who surrender fully to Him.",
    summaryHindi:
      "अध्याय 18 गीता का भव्य उपसंहार है। कृष्ण अपनी सभी शिक्षाओं का सार देते हैं — संन्यास, तीन गुण, स्वभाव के अनुसार कर्तव्य, भक्ति का परम रहस्य, और उन्हें पूर्ण रूप से शरण लेने वाले को मोक्ष का अंतिम वचन।",
    keyVerse: {
      sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज",
      transliteration: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja",
      meaning:
        "Abandon all varieties of dharma and simply surrender unto Me. I shall liberate you from all sins. Do not fear.",
    },
    themes: ["Moksha", "Surrender", "Final Teaching", "Liberation"],
  },
];
