export interface JainTerm {
  id: string;
  term: string;
  termHi: string;
  definition: string;
  definitionHi: string;
  category:
    | "Philosophy"
    | "Conduct"
    | "Rituals"
    | "Fundamentals"
    | "Cosmology"
    | "Saints";
  relatedTerms: string[];
}

export const jainTerms: JainTerm[] = [
  {
    id: "ahimsa",
    term: "Ahimsa",
    termHi: "अहिंसा",
    definition:
      "Ahimsa is the cardinal Jain principle of non-violence toward all living beings, encompassing thought, speech, and action. It is the supreme ethical guideline and the foundation upon which all other Jain virtues rest. Every Jain vow and practice is ultimately an expression of Ahimsa.",
    definitionHi:
      "अहिंसा जैन धर्म का सर्वोच्च सिद्धांत है जो समस्त जीवों के प्रति विचार, वाणी और कर्म में हिंसा न करने का आदेश देता है। यह सभी जैन व्रतों और आचरण का आधार है।",
    category: "Philosophy",
    relatedTerms: [
      "mahavratas",
      "satya",
      "asteya",
      "brahmacharya",
      "aparigraha",
    ],
  },
  {
    id: "anekantavada",
    term: "Anekantavada",
    termHi: "अनेकान्तवाद",
    definition:
      "Anekantavada is the Jain doctrine of many-sidedness, holding that reality is complex and cannot be perceived absolutely from any single viewpoint. It teaches that truth has infinite aspects and that all partial perspectives contain some validity. This philosophical stance is the basis for Jain tolerance and non-absolutism.",
    definitionHi:
      "अनेकान्तवाद जैन दर्शन का वह सिद्धांत है जो यह मानता है कि वास्तविकता बहुआयामी है और किसी एक दृष्टिकोण से पूरी तरह नहीं जानी जा सकती। इससे जैन धर्म की सहिष्णुता और संपूर्णता का भाव उत्पन्न होता है।",
    category: "Philosophy",
    relatedTerms: ["nishchay-nay", "vyavahar-nay", "syadvada", "jnana"],
  },
  {
    id: "aparigraha",
    term: "Aparigraha",
    termHi: "अपरिग्रह",
    definition:
      "Aparigraha is the Jain vow of non-possessiveness or non-attachment to worldly things. It advocates limiting one's possessions to only what is truly necessary and not hoarding material wealth. For monks it means complete renunciation; for laity it means setting personal limits on wealth.",
    definitionHi:
      "अपरिग्रह का अर्थ है परिग्रह (संचय और आसक्ति) से दूर रहना। साधु-साध्वियों के लिए यह पूर्ण त्याग है, जबकि गृहस्थों के लिए यह अपनी संपत्ति की सीमा निर्धारित करने का व्रत है।",
    category: "Conduct",
    relatedTerms: ["mahavratas", "ahimsa", "brahmacharya", "vrata"],
  },
  {
    id: "arihant",
    term: "Arihant",
    termHi: "अरिहंत",
    definition:
      "An Arihant (also Arahant) is a liberated soul who has destroyed all four destructive karmas—knowledge-obscuring, perception-obscuring, deluding, and energy-obstructing—while still living in a body. They are omniscient beings who teach the path to liberation. All Tirthankaras are Arihants, but not all Arihants become Tirthankaras.",
    definitionHi:
      "अरिहंत वह आत्मा है जिसने चारों घातिया कर्मों का नाश कर लिया है और केवलज्ञान प्राप्त कर लिया है। तीर्थंकर अरिहंत होते हैं, लेकिन सभी अरिहंत तीर्थंकर नहीं होते।",
    category: "Fundamentals",
    relatedTerms: ["panch-parmesthi", "tirthankara", "siddha", "keval-gyan"],
  },
  {
    id: "ashtaprakari-puja",
    term: "Ashtaprakari Puja",
    termHi: "अष्टप्रकारी पूजा",
    definition:
      "Ashtaprakari Puja is the eightfold worship of Jain Tirthankaras performed with eight specific offerings: water, sandalwood paste, flowers, incense, lamp, rice, sweets, and fruit. Each offering symbolically represents a virtue on the spiritual path. It is the most common form of Jain devotional worship in temples.",
    definitionHi:
      "अष्टप्रकारी पूजा जिनेन्द्र भगवान की आठ प्रकार की पूजा है—जल, चंदन, पुष्प, धूप, दीप, अक्षत, नैवेद्य और फल—जिनमें से प्रत्येक एक विशेष गुण का प्रतीक है।",
    category: "Rituals",
    relatedTerms: ["puja", "tirthankara", "stotra"],
  },
  {
    id: "asteya",
    term: "Asteya",
    termHi: "अस्तेय",
    definition:
      "Asteya is the Jain vow of non-stealing, which includes not taking anything that has not been freely given. It encompasses avoiding fraud, misappropriation, and the use of others' resources without permission. It is one of the five Mahavratas for monks and Anuvratas for laypeople.",
    definitionHi:
      "अस्तेय का अर्थ है चोरी न करना—न केवल वस्तुओं की, बल्कि किसी की भी संपत्ति बिना अनुमति के न लेना। यह पाँच महाव्रतों में से एक है।",
    category: "Conduct",
    relatedTerms: ["mahavratas", "ahimsa", "satya", "vrata"],
  },
  {
    id: "atma",
    term: "Atma",
    termHi: "आत्मा",
    definition:
      "Atma (Soul) in Jain philosophy is an eternal, independent, conscious substance that is distinct from the physical body and karmic matter. Every living being possesses a unique soul capable of liberation. Unlike some other traditions, Jainism holds that no two souls are identical and no supreme deity controls individual souls.",
    definitionHi:
      "जैन दर्शन में आत्मा एक स्वतंत्र, चेतन और शाश्वत द्रव्य है जो शरीर और कर्म से अलग है। प्रत्येक जीव की अपनी अलग आत्मा है जो मुक्ति पाने में सक्षम है।",
    category: "Philosophy",
    relatedTerms: ["jiva", "karma", "moksha", "samsara", "dravya"],
  },
  {
    id: "bhavana",
    term: "Bhavana",
    termHi: "भावना",
    definition:
      "Bhavana refers to the twelve contemplations (Anupreksha) practiced to cultivate right thought and detachment in Jain spirituality. They include meditation on impermanence, helplessness, the cycle of rebirth, aloneness of the soul, and the distinctness of soul and body. Regular practice purifies the mind and weakens karmic bondage.",
    definitionHi:
      "भावना जैन अनुप्रेक्षाओं का अभ्यास है—बारह चिंतन जो आत्मा की शुद्धि और वैराग्य के लिए किए जाते हैं। इनसे कर्म का बंधन कमजोर होता है।",
    category: "Philosophy",
    relatedTerms: ["tapa", "charitra", "samyak-darshan"],
  },
  {
    id: "brahmacharya",
    term: "Brahmacharya",
    termHi: "ब्रह्मचर्य",
    definition:
      "Brahmacharya is the Jain vow of celibacy and control of sensual desires. For monks and nuns it means complete abstinence from sexual activity; for laypeople it means faithfulness within marriage. It is considered essential for conserving spiritual energy and advancing on the path to liberation.",
    definitionHi:
      "ब्रह्मचर्य का अर्थ है इंद्रियों का संयम और काम-वासना पर नियंत्रण। साधु-साध्वियों के लिए पूर्ण संयम और गृहस्थों के लिए विवाह में निष्ठा अनिवार्य है।",
    category: "Conduct",
    relatedTerms: ["mahavratas", "gupti", "tapa", "samiti"],
  },
  {
    id: "charitra",
    term: "Charitra",
    termHi: "चारित्र",
    definition:
      "Charitra means right conduct and is the third jewel of the Jain trinity known as the Ratnatraya. It involves living in accordance with ethical rules, observing vows (vratas), and practicing restraint. Right conduct is only possible when combined with right faith (Samyak Darshan) and right knowledge (Samyak Gyan).",
    definitionHi:
      "चारित्र अर्थात् सम्यक् आचरण जैन त्रिरत्न का तीसरा रत्न है। यह सम्यक् दर्शन और सम्यक् ज्ञान के साथ मिलकर मोक्ष का मार्ग प्रशस्त करता है।",
    category: "Conduct",
    relatedTerms: [
      "samyak-darshan",
      "samyak-gyan",
      "samyak-charitra",
      "mahavratas",
    ],
  },
  {
    id: "chaturmas",
    term: "Chaturmas",
    termHi: "चातुर्मास",
    definition:
      "Chaturmas is the four-month rainy season retreat observed by Jain monks and nuns. During this period, ascetics stay in one place to avoid inadvertently harming tiny organisms that emerge during the monsoon. It is also an important time for intensive study, sermons, and religious activities for laypeople.",
    definitionHi:
      "चातुर्मास वर्षाकाल के चार महीने होते हैं जिनमें जैन साधु-साध्वियाँ एक स्थान पर रहते हैं ताकि सूक्ष्म जीवों की हिंसा न हो। यह गृहस्थों के लिए धर्माराधना का विशेष अवसर भी है।",
    category: "Conduct",
    relatedTerms: ["paryushana", "muniraj", "ahimsa"],
  },
  {
    id: "dravya",
    term: "Dravya",
    termHi: "द्रव्य",
    definition:
      "Dravya means substance and refers to the six fundamental categories of reality in Jain metaphysics: soul (Jiva), matter (Pudgala), medium of motion (Dharma), medium of rest (Adharma), space (Akasha), and time (Kala). Understanding the nature of these substances is essential to Jain philosophical knowledge.",
    definitionHi:
      "द्रव्य अर्थात् पदार्थ—जैन तत्त्वज्ञान में छः मूलभूत द्रव्य हैं: जीव, पुद्गल, धर्म, अधर्म, आकाश और काल। इन्हें समझना सम्यक् ज्ञान की नींव है।",
    category: "Philosophy",
    relatedTerms: ["jiva", "karma", "tattvartha-sutra", "anekantavada"],
  },
  {
    id: "digambar",
    term: "Digambar",
    termHi: "दिगम्बर",
    definition:
      "Digambar (sky-clad) is one of the two major sects of Jainism, whose monks practice complete nudity as a sign of total renunciation and non-attachment. Digambara tradition holds that women cannot achieve liberation in this birth and that Mahavira was never married. They follow a stricter code of ascetic conduct.",
    definitionHi:
      "दिगम्बर जैन धर्म के दो प्रमुख संप्रदायों में से एक है जिसमें साधु वस्त्र भी नहीं पहनते—यह पूर्ण त्याग और अपरिग्रह का प्रतीक है। इनकी मान्यता है कि स्त्रियाँ इसी जन्म में मोक्ष नहीं पा सकतीं।",
    category: "Fundamentals",
    relatedTerms: ["shvetambara", "muniraj", "tirthankara", "mahavratas"],
  },
  {
    id: "gatha",
    term: "Gatha",
    termHi: "गाथा",
    definition:
      "Gatha refers to a metrical verse or hymn used in Jain scriptures, particularly in the Ardha-Magadhi language of the Agamic texts. Gathas are the primary literary form of Jain canonical literature and are recited in religious ceremonies, study sessions, and rituals. Many important Jain doctrines are preserved in Gatha form.",
    definitionHi:
      "गाथा जैन आगम ग्रंथों में प्रयुक्त पद्यात्मक श्लोक हैं जो मुख्यतः अर्धमागधी भाषा में हैं। ये धार्मिक अनुष्ठानों, स्तुतियों और अध्ययन में उपयोग किए जाते हैं।",
    category: "Rituals",
    relatedTerms: ["stotra", "sutra", "namokar-mantra"],
  },
  {
    id: "gautam-swami",
    term: "Gautam Swami",
    termHi: "गौतम स्वामी",
    definition:
      "Gautam Swami (Indrabhuti Gautama) was the chief disciple (Prathama Ganadhara) of Lord Mahavira and one of the eleven Ganadharas. He is revered for his immense devotion, scholarship, and ability to compile the teachings of Mahavira into the Jain Agamas. He attained omniscience after Mahavira's liberation.",
    definitionHi:
      "गौतम स्वामी भगवान महावीर के प्रथम गणधर और मुख्य शिष्य थे। उन्होंने महावीर के उपदेशों को आगमों में संकलित किया। महावीर के निर्वाण के पश्चात् उन्हें केवलज्ञान प्राप्त हुआ।",
    category: "Saints",
    relatedTerms: ["tirthankara", "nataputta", "panch-parmesthi"],
  },
  {
    id: "gupti",
    term: "Gupti",
    termHi: "गुप्ति",
    definition:
      "Gupti refers to the three restraints practiced by Jain ascetics to control mental, verbal, and physical activities: Manogupti (mind), Vachanagupti (speech), and Kayagupti (body). These restraints help prevent new karma from accumulating and are essential for ascetic discipline alongside the Samitis.",
    definitionHi:
      "गुप्ति का अर्थ है मन, वचन और काय की प्रवृत्तियों पर नियंत्रण—मनोगुप्ति, वचनगुप्ति और कायगुप्ति। इनसे नए कर्म का आस्रव बंद होता है।",
    category: "Conduct",
    relatedTerms: ["samiti", "mahavratas", "charitra", "tapa"],
  },
  {
    id: "indriya",
    term: "Indriya",
    termHi: "इन्द्रिय",
    definition:
      "Indriya refers to the senses in Jain philosophy. Jainism classifies living beings by the number of senses they possess, from one-sensed creatures (touch only) to five-sensed beings with full perception. The five physical senses are touch, taste, smell, sight, and hearing, plus mind (manas) as the inner sense.",
    definitionHi:
      "इन्द्रिय का अर्थ है ज्ञानेन्द्रियाँ। जैन दर्शन जीवों को उनकी इन्द्रियों की संख्या के आधार पर वर्गीकृत करता है—एकेन्द्रिय से पंचेन्द्रिय तक।",
    category: "Philosophy",
    relatedTerms: ["jiva", "karma", "charitra"],
  },
  {
    id: "jiva",
    term: "Jiva",
    termHi: "जीव",
    definition:
      "Jiva is the Jain term for a living soul or sentient being. Jainism recognizes an infinite number of individual souls in the universe, each with the potential for liberation. Jivas are classified by their number of senses and whether they have a mind. The primary characteristic of Jiva is consciousness (chetana).",
    definitionHi:
      "जीव का अर्थ है जीवात्मा—वह चेतन द्रव्य जो जैन ब्रह्मांड में असंख्य रूपों में विद्यमान है। प्रत्येक जीव मोक्ष पाने में समर्थ है। जीव का मुख्य लक्षण चेतना है।",
    category: "Philosophy",
    relatedTerms: ["atma", "dravya", "karma", "moksha", "samsara"],
  },
  {
    id: "jnana",
    term: "Jnana",
    termHi: "ज्ञान",
    definition:
      "Jnana (knowledge) is one of the three jewels (Ratnatraya) of Jainism. Jain epistemology recognizes five types of knowledge: Mati (sensory), Shruta (scriptural), Avadhi (clairvoyance), Manah-paryaya (telepathy), and Keval (omniscience). Right knowledge is direct perception of truth without misconceptions.",
    definitionHi:
      "ज्ञान जैन त्रिरत्न का दूसरा रत्न है। जैन दर्शन में पाँच प्रकार के ज्ञान हैं: मतिज्ञान, श्रुतज्ञान, अवधिज्ञान, मनःपर्ययज्ञान और केवलज्ञान।",
    category: "Philosophy",
    relatedTerms: ["samyak-gyan", "keval-gyan", "samyak-darshan", "charitra"],
  },
  {
    id: "karma",
    term: "Karma",
    termHi: "कर्म",
    definition:
      "In Jainism, Karma is conceived as ultrafine physical matter (not abstract law) that attaches to the soul through actions, thoughts, and speech. There are eight main types of karma, four destructive and four non-destructive. Liberation is achieved by exhausting all accumulated karma and preventing new karma from binding.",
    definitionHi:
      "जैन दर्शन में कर्म एक सूक्ष्म भौतिक पदार्थ है जो आत्मा से क्रियाओं, विचारों और वाणी के माध्यम से बंधता है। आठ प्रकार के कर्म हैं। इन्हें पूर्णतः नष्ट करने पर मोक्ष होता है।",
    category: "Philosophy",
    relatedTerms: ["atma", "jiva", "moksha", "samsara", "tapa"],
  },
  {
    id: "keval-gyan",
    term: "Keval Gyan",
    termHi: "केवलज्ञान",
    definition:
      "Keval Gyan (omniscience) is the highest and purest form of knowledge in Jainism, attained when all four destructive karmas are completely destroyed. It is infinite, perfect, simultaneous knowledge of all substances, all their modifications, and all time periods. All Tirthankaras possess Keval Gyan.",
    definitionHi:
      "केवलज्ञान सर्वोच्च ज्ञान है जो चारों घातिया कर्मों के नाश से प्राप्त होता है। यह अनंत, पूर्ण और समस्त काल-लोक को एक साथ जानने वाला ज्ञान है। सभी तीर्थंकर केवलज्ञानी होते हैं।",
    category: "Philosophy",
    relatedTerms: ["arihant", "jnana", "karma", "tirthankara", "moksha"],
  },
  {
    id: "kshamapana",
    term: "Kshamapana",
    termHi: "क्षमापना",
    definition:
      "Kshamapana is the Jain practice of seeking and granting forgiveness, most prominently observed at the end of Paryushana (for Shvetambar) or Dashalakshana (for Digambar) festivals. Devotees ask for forgiveness from all beings—'Michhami Dukkadam' (may all my transgressions be forgiven). It embodies Jain values of humility and harmony.",
    definitionHi:
      "क्षमापना क्षमा माँगने और देने की जैन परंपरा है जो पर्युषण के अंत में मनाई जाती है। 'मिच्छामि दुक्कडम्' कहकर सभी से क्षमा माँगी जाती है। यह विनम्रता और अहिंसा का प्रतीक है।",
    category: "Rituals",
    relatedTerms: ["paryushana", "pratikraman", "ahimsa"],
  },
  {
    id: "lekhna-tapas",
    term: "Lekhna Tapas",
    termHi: "लेखन तपस",
    definition:
      "Lekhna Tapas is a Jain austerity involving the careful transcription of sacred scriptures. It is considered a meritorious act as it preserves holy texts for future generations. This practice reflects the high regard in which Jainism holds scriptural knowledge and literary preservation.",
    definitionHi:
      "लेखन तपस का अर्थ है पवित्र ग्रंथों का सावधानीपूर्वक लेखन करना, जिसे एक धर्माचरण माना जाता है। इससे शास्त्र-संरक्षण होता है और कर्म क्षय की प्रक्रिया भी।",
    category: "Conduct",
    relatedTerms: ["tapa", "sutra", "charitra"],
  },
  {
    id: "lok",
    term: "Lok",
    termHi: "लोक",
    definition:
      "Lok refers to the Jain conception of the universe, which is depicted as having the shape of a standing human figure. It is divided into three realms: the lower worlds (hellish realms), the middle world (where humans live), and the upper worlds (heavenly realms). Above the Lok is the Alok (non-universe), the abode of liberated souls.",
    definitionHi:
      "लोक जैन ब्रह्मांड की संरचना है जो एक खड़े पुरुष के आकार की है। इसमें अधोलोक, मध्यलोक और ऊर्ध्वलोक हैं। लोक के ऊपर अलोक है जहाँ सिद्ध आत्माएँ निवास करती हैं।",
    category: "Cosmology",
    relatedTerms: ["samsara", "moksha", "siddha", "sagara"],
  },
  {
    id: "mahavratas",
    term: "Mahavratas",
    termHi: "महाव्रत",
    definition:
      "Mahavratas are the five great vows taken by Jain monks and nuns: Ahimsa (non-violence), Satya (truth), Asteya (non-stealing), Brahmacharya (celibacy), and Aparigraha (non-possessiveness). These vows are observed in their absolute form by ascetics. The lay equivalents are the Anuvratas, observed with more flexibility.",
    definitionHi:
      "महाव्रत जैन साधु-साध्वियों के पाँच महान व्रत हैं—अहिंसा, सत्य, अस्तेय, ब्रह्मचर्य और अपरिग्रह। ये पूर्ण रूप से पाले जाते हैं। गृहस्थों के लिए अणुव्रत (लघु व्रत) का विधान है।",
    category: "Conduct",
    relatedTerms: [
      "ahimsa",
      "satya",
      "asteya",
      "brahmacharya",
      "aparigraha",
      "vrata",
    ],
  },
  {
    id: "moksha",
    term: "Moksha",
    termHi: "मोक्ष",
    definition:
      "Moksha (liberation) is the ultimate spiritual goal in Jainism—the complete liberation of the soul from all karmic matter and the cycle of rebirth. A liberated soul (Siddha) exists at the top of the Lok in a state of infinite knowledge, infinite perception, infinite bliss, and infinite power. It is eternal and never returns to worldly existence.",
    definitionHi:
      "मोक्ष जैन धर्म का परम लक्ष्य है—सभी कर्मों से मुक्त होकर आत्मा का शुद्ध, अनंत ज्ञान-दर्शन-सुख-वीर्य वाली अवस्था में स्थित हो जाना। मुक्त आत्मा सिद्धलोक में विराजती है।",
    category: "Philosophy",
    relatedTerms: ["samsara", "karma", "siddha", "arihant", "mahavratas"],
  },
  {
    id: "muniraj",
    term: "Muniraj",
    termHi: "मुनिराज",
    definition:
      "Muniraj is a respectful title for a Jain monk (muni). Jain monks observe the five Mahavratas, abandon all possessions, wander barefoot, eat once a day from householders' hands (paatravritti), and practice complete detachment. In the Digambar tradition monks are also unclothed as the ultimate symbol of renunciation.",
    definitionHi:
      "मुनिराज जैन साधुओं को दिया जाने वाला सम्मानजनक संबोधन है। मुनि पाँच महाव्रत पालते हैं, नंगे पाँव विचरण करते हैं और एक बार भोजन लेते हैं। दिगम्बर परंपरा में वे निर्वस्त्र रहते हैं।",
    category: "Conduct",
    relatedTerms: [
      "mahavratas",
      "digambar",
      "shvetambara",
      "chaturmas",
      "panch-parmesthi",
    ],
  },
  {
    id: "namokar-mantra",
    term: "Namokar Mantra",
    termHi: "णमोकार मंत्र",
    definition:
      "The Namokar Mantra (Navkar Mantra) is the most sacred and fundamental prayer in Jainism. It pays homage to the five supreme beings: Arihants, Siddhas, Acharyas, Upadhyayas, and all Sadhus. It does not ask for personal favors but simply venerates the spiritual qualities of these enlightened beings, making it universally recitable.",
    definitionHi:
      "णमोकार मंत्र (नवकार मंत्र) जैन धर्म का सर्वाधिक पवित्र मंत्र है जिसमें पंच परमेष्ठी को नमस्कार किया जाता है—अरिहंत, सिद्ध, आचार्य, उपाध्याय और साधु। यह कोई वरदान नहीं माँगता, केवल गुणों को नमन करता है।",
    category: "Rituals",
    relatedTerms: ["panch-parmesthi", "arihant", "siddha", "upadhyaya"],
  },
  {
    id: "nataputta",
    term: "Nataputta",
    termHi: "नातपुत्त",
    definition:
      "Nataputta is the name used in Pali Buddhist texts to refer to Vardhamana Mahavira, the 24th Tirthankara of Jainism. The name means 'son of the Nata (Jnatrika) clan.' Early Buddhist scriptures frequently mention Nataputta as a contemporary teacher of Gautama Buddha, confirming the historicity of Mahavira.",
    definitionHi:
      "नातपुत्त बौद्ध पालि ग्रंथों में भगवान महावीर का नाम है, जिसका अर्थ है 'ज्ञातृ कुल का पुत्र।' इससे महावीर की ऐतिहासिकता की पुष्टि होती है क्योंकि वे गौतम बुद्ध के समकालीन थे।",
    category: "Saints",
    relatedTerms: ["tirthankara", "gautam-swami"],
  },
  {
    id: "nishchay-nay",
    term: "Nishchay Nay",
    termHi: "निश्चय नय",
    definition:
      "Nishchay Nay (absolute standpoint) is one of the two primary perspectives in Jain epistemology. It views reality from an ultimate, transcendental standpoint, focusing on the pure intrinsic nature of substances without regard to their practical roles. It is paired with Vyavahar Nay (practical standpoint) for complete understanding.",
    definitionHi:
      "निश्चय नय वह दृष्टिकोण है जो पदार्थ के शुद्ध, परम स्वरूप को देखता है—जैसे आत्मा का शुद्ध चेतन स्वभाव। यह व्यवहार नय के साथ मिलकर पूर्ण ज्ञान देता है।",
    category: "Philosophy",
    relatedTerms: ["vyavahar-nay", "anekantavada", "jnana", "atma"],
  },
  {
    id: "panch-parmesthi",
    term: "Panch Parmesthi",
    termHi: "पंच परमेष्ठी",
    definition:
      "Panch Parmesthi refers to the five supreme spiritual beings worthy of veneration in Jainism: Arihants (liberated living omniscients), Siddhas (fully liberated souls), Acharyas (heads of ascetic orders), Upadhyayas (ascetic scholars), and Sadhus (all monks and nuns). The Namokar Mantra is an homage to these five.",
    definitionHi:
      "पंच परमेष्ठी जैन धर्म में पाँच परम पूजनीय पद हैं—अरिहंत, सिद्ध, आचार्य, उपाध्याय और साधु। णमोकार मंत्र इन्हीं पाँचों को नमन करता है।",
    category: "Fundamentals",
    relatedTerms: [
      "namokar-mantra",
      "arihant",
      "siddha",
      "upadhyaya",
      "muniraj",
    ],
  },
  {
    id: "paryushana",
    term: "Paryushana",
    termHi: "पर्युषण",
    definition:
      "Paryushana is the most important Jain festival, lasting 8 days for Shvetambars and 10 days (Dashalakshana) for Digambars. It is a period of intense spiritual reflection, fasting, repentance, study, and forgiveness. The festival culminates in Kshamapana, when Jains seek forgiveness from all beings.",
    definitionHi:
      "पर्युषण जैन धर्म का सबसे महत्वपूर्ण पर्व है—श्वेताम्बर 8 दिन और दिगम्बर 10 दिन (दशलक्षण) मनाते हैं। यह उपवास, प्रतिक्रमण, ध्यान और क्षमापना का पर्व है।",
    category: "Rituals",
    relatedTerms: ["kshamapana", "pratikraman", "chaturmas", "tapa"],
  },
  {
    id: "pratikraman",
    term: "Pratikraman",
    termHi: "प्रतिक्रमण",
    definition:
      "Pratikraman is the Jain ritual of introspection and repentance, performed to confess and atone for transgressions committed during the day, night, or year. It involves reciting specific prayers, including portions of the Namokar Mantra, and asking for forgiveness from all beings inadvertently harmed. It is one of the six essential daily duties (Avashyakas).",
    definitionHi:
      "प्रतिक्रमण एक नियमित जैन धार्मिक क्रिया है जिसमें हुई भूलों का पश्चाताप किया जाता है और सभी जीवों से क्षमा माँगी जाती है। यह छह आवश्यक कर्तव्यों (आवश्यक) में से एक है।",
    category: "Rituals",
    relatedTerms: ["kshamapana", "paryushana", "namokar-mantra", "charitra"],
  },
  {
    id: "puja",
    term: "Puja",
    termHi: "पूजा",
    definition:
      "Puja in Jainism refers to devotional worship of the Tirthankaras performed in temples. It may be Dravya Puja (material worship using substances) or Bhava Puja (mental worship through meditation and devotion). The most common form is Ashtaprakari Puja. Jain worship focuses on veneration of qualities rather than seeking divine favors.",
    definitionHi:
      "जैन पूजा तीर्थंकरों की मंदिर में उपासना है। इसमें द्रव्य पूजा (अष्टप्रकारी पूजा) और भाव पूजा (ध्यान और स्तुति) दोनों शामिल हैं। पूजा का उद्देश्य गुणों का आदर करना है, न कि कोई वरदान माँगना।",
    category: "Rituals",
    relatedTerms: [
      "ashtaprakari-puja",
      "tirthankara",
      "stotra",
      "namokar-mantra",
    ],
  },
  {
    id: "sagara",
    term: "Sagara",
    termHi: "सागर",
    definition:
      "Sagara is the Jain unit of time measurement equivalent to ten crore (100 million) purva cycles, where one purva equals 84 lakh years raised to the 28th power. It is used in Jain cosmological calculations, particularly in describing the length of cosmic time cycles (Kalpas) and the lifespans of beings in various realms.",
    definitionHi:
      "सागर जैन कालमान की एक इकाई है। इसका उपयोग ब्रह्मांडीय काल-चक्रों की गणना में होता है—जैसे देवलोक के जीवों की आयु और कल्प-काल की अवधि।",
    category: "Cosmology",
    relatedTerms: ["lok", "samsara", "dravya"],
  },
  {
    id: "samiti",
    term: "Samiti",
    termHi: "समिति",
    definition:
      "Samiti refers to the five careful activities prescribed for Jain ascetics to minimize harm: Irya Samiti (care in walking), Bhasha Samiti (care in speaking), Aishana Samiti (care in accepting food), Adana-Bhanda-Nikshepana Samiti (care in handling objects), and Utsarga Samiti (care in disposing of bodily waste). They complement the three Guptis.",
    definitionHi:
      "समिति पाँच सावधानियाँ हैं जो जैन साधुओं के आचरण में हिंसा को न्यूनतम करती हैं—ईर्या, भाषा, एषणा, आदान-निक्षेप और उत्सर्ग समिति। ये गुप्ति के साथ पाले जाती हैं।",
    category: "Conduct",
    relatedTerms: ["gupti", "mahavratas", "charitra", "ahimsa"],
  },
  {
    id: "samsara",
    term: "Samsara",
    termHi: "संसार",
    definition:
      "Samsara is the cycle of birth, death, and rebirth experienced by souls bound by karma. In Jainism, a soul can be reborn in any of the four realms: hellish beings, plants and microorganisms, animals and humans, or celestial beings. The ultimate aim of Jain practice is to escape Samsara and attain Moksha.",
    definitionHi:
      "संसार का अर्थ है जन्म-मृत्यु का अनंत चक्र। कर्मबद्ध आत्मा चार गतियों (नरक, तिर्यंच, मनुष्य, देव) में भटकती रहती है। जैन साधना का लक्ष्य इस चक्र से मुक्ति है।",
    category: "Philosophy",
    relatedTerms: ["karma", "moksha", "jiva", "lok"],
  },
  {
    id: "samyak-charitra",
    term: "Samyak Charitra",
    termHi: "सम्यक् चारित्र",
    definition:
      "Samyak Charitra is right conduct, the third jewel of Jainism's Ratnatraya. It involves living ethically in accordance with the spiritual path—observing vows, practicing restraint, and striving to shed karma. Right conduct is ineffective without right faith and right knowledge; together they form the complete path to liberation.",
    definitionHi:
      "सम्यक् चारित्र त्रिरत्न का तीसरा रत्न है। यह व्रतों के पालन, संयम और कर्म क्षय के प्रयासों द्वारा जीवन जीने का सही तरीका है। यह सम्यक् दर्शन और ज्ञान के साथ ही फलदायी है।",
    category: "Conduct",
    relatedTerms: ["charitra", "samyak-darshan", "samyak-gyan", "mahavratas"],
  },
  {
    id: "samyak-darshan",
    term: "Samyak Darshan",
    termHi: "सम्यक् दर्शन",
    definition:
      "Samyak Darshan is right faith or right vision—the first jewel of the Jain Ratnatraya. It means unwavering faith in the true nature of the soul, karma, and the path to liberation as taught by the Tirthankaras. Without right faith, neither knowledge nor conduct can lead to true liberation.",
    definitionHi:
      "सम्यक् दर्शन त्रिरत्न का पहला रत्न है—तीर्थंकरों के उपदेशानुसार आत्मा, कर्म और मोक्षमार्ग पर अटूट श्रद्धा। इसके बिना सम्यक् ज्ञान और चारित्र का मोक्षमार्ग नहीं बनता।",
    category: "Philosophy",
    relatedTerms: ["samyak-gyan", "samyak-charitra", "charitra", "jnana"],
  },
  {
    id: "samyak-gyan",
    term: "Samyak Gyan",
    termHi: "सम्यक् ज्ञान",
    definition:
      "Samyak Gyan is right knowledge—the second jewel of the Ratnatraya. It is the correct, complete, and doubting-free knowledge of the nature of reality including the self, karma, the universe, and the path to liberation. Right knowledge arises from right faith and must be combined with right conduct for spiritual advancement.",
    definitionHi:
      "सम्यक् ज्ञान त्रिरत्न का दूसरा रत्न है—आत्मा, कर्म, ब्रह्मांड और मोक्षमार्ग का सही, संशयरहित ज्ञान। यह सम्यक् दर्शन के बाद उत्पन्न होता है और सम्यक् चारित्र के साथ मोक्ष देता है।",
    category: "Philosophy",
    relatedTerms: ["jnana", "samyak-darshan", "samyak-charitra", "keval-gyan"],
  },
  {
    id: "satya",
    term: "Satya",
    termHi: "सत्य",
    definition:
      "Satya is the Jain vow of truthfulness—speaking only what is true, beneficial, and not hurtful. It extends beyond verbal honesty to encompass sincere thought and deed. However, Jainism also teaches that truth must be tempered by Ahimsa: if speaking the truth would cause harm, silence is preferable.",
    definitionHi:
      "सत्य का अर्थ है हित, मित और प्रिय वचन बोलना। यदि सत्य बोलने से हिंसा हो, तो मौन श्रेयस्कर है—यही जैन सत्य की विशेषता है।",
    category: "Conduct",
    relatedTerms: ["mahavratas", "ahimsa", "asteya", "vrata"],
  },
  {
    id: "shvetambara",
    term: "Shvetambara",
    termHi: "श्वेताम्बर",
    definition:
      "Shvetambara (white-clad) is one of the two major sects of Jainism, whose monks and nuns wear simple white garments. The Shvetambara tradition holds that women can attain liberation and that Mallinath, the 19th Tirthankara, was female. They accept the canonical Agamas as the primary scriptural authority.",
    definitionHi:
      "श्वेताम्बर जैन धर्म का दूसरा प्रमुख संप्रदाय है जिसमें साधु-साध्वियाँ सफेद वस्त्र पहनते हैं। इनकी मान्यता है कि स्त्रियाँ मोक्ष पा सकती हैं और 19वें तीर्थंकर मल्लिनाथ स्त्री थीं।",
    category: "Fundamentals",
    relatedTerms: ["digambar", "muniraj", "tirthankara", "mahavratas"],
  },
  {
    id: "siddha",
    term: "Siddha",
    termHi: "सिद्ध",
    definition:
      "A Siddha is a fully liberated soul that has shed all karmas and ascended to the top of the cosmic universe (Siddhaloka). Siddhas possess infinite knowledge, infinite perception, infinite bliss, and infinite power. They are beyond the cycle of rebirth and never return to worldly existence.",
    definitionHi:
      "सिद्ध वह आत्मा है जिसने सभी कर्मों से मुक्ति पाकर सिद्धलोक में स्थान प्राप्त कर लिया है। सिद्धों में अनंत ज्ञान, दर्शन, सुख और वीर्य होते हैं। वे पुनर्जन्म से परे हैं।",
    category: "Fundamentals",
    relatedTerms: ["arihant", "moksha", "panch-parmesthi", "lok"],
  },
  {
    id: "stotra",
    term: "Stotra",
    termHi: "स्तोत्र",
    definition:
      "Stotra is a devotional hymn or praise-poem composed in honor of Jain Tirthankaras or other revered beings. Famous Jain stotras include the Bhaktamar Stotra (in praise of Adinath) and Kalyanak Stotra. They are sung or recited in temples and during religious gatherings as a form of devotional practice.",
    definitionHi:
      "स्तोत्र तीर्थंकरों की स्तुति में रचे गए पद्य हैं। भक्तामर स्तोत्र, उवसग्गहरं स्तोत्र आदि प्रसिद्ध जैन स्तोत्र हैं जो मंदिरों और धार्मिक अनुष्ठानों में गाए जाते हैं।",
    category: "Rituals",
    relatedTerms: ["puja", "gatha", "namokar-mantra", "tirthankara"],
  },
  {
    id: "sutra",
    term: "Sutra",
    termHi: "सूत्र",
    definition:
      "Sutra refers to a scriptural aphorism or canonical text in Jainism. The Jain canonical literature is composed in Ardha-Magadhi and is collectively called the Agamas. Key sutras include the Acharanga Sutra (conduct of monks), Sutrakritanga, and the Tattvartha Sutra. They serve as the authoritative guide for Jain doctrine and practice.",
    definitionHi:
      "सूत्र जैन आगम साहित्य के संक्षिप्त और प्राधिकृत वचन हैं। आचारांग सूत्र, सूत्रकृतांग और तत्त्वार्थ सूत्र प्रमुख जैन ग्रंथ हैं जो साधु-आचार और सिद्धांत का मार्गदर्शन करते हैं।",
    category: "Fundamentals",
    relatedTerms: ["tattvartha-sutra", "gatha", "jnana"],
  },
  {
    id: "syadvada",
    term: "Syadvada",
    termHi: "स्याद्वाद",
    definition:
      "Syadvada is the Jain theory of qualified predication, expressing that any statement about reality is only conditionally or partially true. Each assertion is prefaced with 'syat' (perhaps/in some sense), acknowledging that other perspectives also contain truth. It is the linguistic and logical expression of Anekantavada.",
    definitionHi:
      "स्याद्वाद जैन दर्शन की वह पद्धति है जिसमें प्रत्येक कथन 'स्यात्' (शायद/किसी अपेक्षा से) के साथ कहा जाता है। यह अनेकान्तवाद का भाषिक रूप है और पूर्ण सत्य को सापेक्ष दृष्टि से समझाता है।",
    category: "Philosophy",
    relatedTerms: ["anekantavada", "nishchay-nay", "vyavahar-nay", "jnana"],
  },
  {
    id: "tapa",
    term: "Tapa",
    termHi: "तप",
    definition:
      "Tapa (austerity) is a central Jain practice for shedding accumulated karma. It is divided into external (bahya) austerities—fasting, eating less, eating specific foods, renouncing tasty food, solitary living, and bodily mortification—and internal (abhyantar) austerities—repentance, humility, service, study, abandonment of attachments, and meditation.",
    definitionHi:
      "तप कर्म क्षय के लिए किए जाने वाले अनुष्ठान हैं। इनके दो भाग हैं: बाह्य तप (उपवास, विगय त्याग आदि) और अभ्यन्तर तप (प्रायश्चित, विनय, स्वाध्याय, ध्यान आदि)।",
    category: "Conduct",
    relatedTerms: ["charitra", "karma", "paryushana", "mahavratas"],
  },
  {
    id: "tattvartha-sutra",
    term: "Tattvartha Sutra",
    termHi: "तत्त्वार्थ सूत्र",
    definition:
      "The Tattvartha Sutra (also Tattvarthadhigama Sutra) is the most authoritative philosophical text of Jainism, composed by Umasvati around the 2nd–5th century CE. It is accepted by both Digambar and Shvetambara sects and systematically covers all aspects of Jain philosophy in 344 aphorisms across 10 chapters.",
    definitionHi:
      "तत्त्वार्थ सूत्र जैन दर्शन का सर्वाधिक प्रामाणिक ग्रंथ है जिसे उमास्वाति ने रचा। यह दोनों सम्प्रदायों द्वारा मान्य है और 10 अध्यायों में 344 सूत्रों में समस्त जैन दर्शन को व्यवस्थित रूप से प्रस्तुत करता है।",
    category: "Fundamentals",
    relatedTerms: ["sutra", "dravya", "jiva", "karma", "moksha"],
  },
  {
    id: "tirthankara",
    term: "Tirthankara",
    termHi: "तीर्थंकर",
    definition:
      "A Tirthankara is a liberated, omniscient being who re-establishes the Jain path (Tirtha) of liberation in each cosmic cycle. There are 24 Tirthankaras in the current cosmic cycle, the most recent being Lord Mahavira (599–527 BCE). They serve as spiritual guides but do not intervene in worldly affairs, as they are beyond all karmic activity.",
    definitionHi:
      "तीर्थंकर वे महान आत्माएँ हैं जो केवलज्ञान प्राप्त कर चतुर्विध संघ (साधु, साध्वी, श्रावक, श्राविका) की स्थापना करती हैं। वर्तमान कल्प में 24 तीर्थंकर हुए हैं, जिनमें अंतिम भगवान महावीर हैं।",
    category: "Fundamentals",
    relatedTerms: ["arihant", "siddha", "panch-parmesthi", "keval-gyan"],
  },
  {
    id: "upadhyaya",
    term: "Upadhyaya",
    termHi: "उपाध्याय",
    definition:
      "Upadhyaya is the fourth of the five supreme beings (Panch Parmesthi) in Jainism. They are ascetic scholars who teach scriptures to monks and nuns. An Upadhyaya has renounced all worldly attachments, practices the Mahavratas, and is dedicated to the study and transmission of Jain canonical knowledge.",
    definitionHi:
      "उपाध्याय पंच परमेष्ठी का चौथा पद है। ये वे साधु हैं जो अपने साथियों को आगम-शास्त्रों का अध्ययन कराते हैं। ये महाव्रतधारी और शास्त्रज्ञ होते हैं।",
    category: "Conduct",
    relatedTerms: ["panch-parmesthi", "namokar-mantra", "muniraj", "arihant"],
  },
  {
    id: "vrata",
    term: "Vrata",
    termHi: "व्रत",
    definition:
      "Vrata refers to a religious vow or observance in Jainism, undertaken to advance spiritually and shed karma. Monks observe the five Mahavratas (great vows); laypeople observe twelve vows including five Anuvratas (minor vows), three Gunavratas (merit vows), and four Shikshavratas (discipline vows). Vratas are central to Jain religious life.",
    definitionHi:
      "व्रत धार्मिक प्रतिज्ञा है जो आत्मशुद्धि और कर्म-निर्जरा के लिए ली जाती है। साधुओं के पाँच महाव्रत और गृहस्थों के बारह व्रत (पाँच अणुव्रत, तीन गुणव्रत, चार शिक्षाव्रत) होते हैं।",
    category: "Conduct",
    relatedTerms: ["mahavratas", "ahimsa", "tapa", "charitra"],
  },
  {
    id: "vyavahar-nay",
    term: "Vyavahar Nay",
    termHi: "व्यवहार नय",
    definition:
      "Vyavahar Nay (practical standpoint) is the complementary perspective to Nishchay Nay in Jain epistemology. It looks at reality from a practical, conventional standpoint, taking into account the functional roles and relationships of substances. Both perspectives are necessary for complete understanding of any subject.",
    definitionHi:
      "व्यवहार नय वह दृष्टिकोण है जो पदार्थ को व्यावहारिक और सांसारिक दृष्टि से देखता है। यह निश्चय नय का पूरक है और दोनों मिलकर पूर्ण ज्ञान देते हैं।",
    category: "Philosophy",
    relatedTerms: ["nishchay-nay", "anekantavada", "syadvada", "jnana"],
  },
  {
    id: "yati",
    term: "Yati",
    termHi: "यति",
    definition:
      "Yati refers to a class of semi-ascetic Jain monks in the Shvetambara tradition who have not taken the full five Mahavratas but live a life of relative restraint in monasteries or houses. They wear white clothes and practice partial renunciation. Unlike fully ordained monks, they are permitted to use vehicles and do not wander barefoot.",
    definitionHi:
      "यति श्वेताम्बर परंपरा में वे अर्ध-साधु हैं जिन्होंने पूर्ण महाव्रत नहीं लिए हैं, किंतु श्वेत वस्त्र पहन संयमित जीवन जीते हैं। ये वाहन का उपयोग कर सकते हैं और एक स्थान पर रह सकते हैं।",
    category: "Conduct",
    relatedTerms: ["muniraj", "shvetambara", "mahavratas"],
  },
  // Additional terms to reach 60+
  {
    id: "agama",
    term: "Agama",
    termHi: "आगम",
    definition:
      "Agamas are the canonical scriptures of Jainism, believed to contain the original teachings of Lord Mahavira as compiled by his chief disciples. The Shvetambara tradition recognizes 45 Agamas (though some are partially lost), while the Digambara tradition holds that the original Agamas are completely lost and relies on later texts.",
    definitionHi:
      "आगम जैन धर्म के मूल शास्त्र हैं जो भगवान महावीर के उपदेशों के संकलन माने जाते हैं। श्वेताम्बर 45 आगमों को प्रमाण मानते हैं; दिगम्बर मानते हैं कि मूल आगम लुप्त हो गए।",
    category: "Fundamentals",
    relatedTerms: [
      "sutra",
      "gatha",
      "tattvartha-sutra",
      "shvetambara",
      "digambar",
    ],
  },
  {
    id: "anga",
    term: "Anga",
    termHi: "अंग",
    definition:
      "Anga (limb) refers to the twelve primary canonical texts of Jainism, representing the direct teachings of Lord Mahavira. They include the Acharanga Sutra (ascetic conduct), Sutrakritanga (refutation of other doctrines), Sthananga (classification), and others. The 12th Anga, Drishtivaada, is considered entirely lost.",
    definitionHi:
      "अंग जैन आगम के बारह प्रमुख ग्रंथ हैं जो महावीर की शिक्षाओं का सीधा प्रतिनिधित्व करते हैं। इनमें आचारांग, सूत्रकृतांग, स्थानांग आदि प्रमुख हैं। बारहवाँ अंग 'दृष्टिवाद' लुप्त माना जाता है।",
    category: "Fundamentals",
    relatedTerms: ["agama", "sutra", "tattvartha-sutra", "shvetambara"],
  },
  {
    id: "acharya",
    term: "Acharya",
    termHi: "आचार्य",
    definition:
      "Acharya is the third of the five Panch Parmesthi, designating the head of an ascetic order. An Acharya guides and disciplines the community of monks and nuns, interprets scriptures, and is responsible for preserving Jain tradition. They must exemplify all five Mahavratas and possess deep knowledge of the Agamas.",
    definitionHi:
      "आचार्य पंच परमेष्ठी का तीसरा पद है। ये साधु-साध्वियों के संघ के नेता होते हैं, शास्त्रों की व्याख्या करते हैं और परंपरा को जीवित रखते हैं। इनमें पाँचों महाव्रतों का पूर्ण पालन होता है।",
    category: "Conduct",
    relatedTerms: ["panch-parmesthi", "namokar-mantra", "muniraj", "upadhyaya"],
  },
  {
    id: "ashrava",
    term: "Ashrava",
    termHi: "आस्रव",
    definition:
      "Ashrava means the influx of karmic matter into the soul. It occurs through passions (Kashaya) such as anger, ego, deceit, and greed, as well as through activities of mind, speech, and body. Understanding and stopping Ashrava is a key step in the Jain path to liberation, followed by Samvara (stoppage).",
    definitionHi:
      "आस्रव का अर्थ है कर्म पुद्गलों का आत्मा में आना। यह क्रोध, मान, माया और लोभ जैसे कषायों तथा मन-वचन-काय की प्रवृत्तियों से होता है। आस्रव को रोकना (संवर) मोक्षमार्ग का महत्वपूर्ण चरण है।",
    category: "Philosophy",
    relatedTerms: ["karma", "samvara", "nirjara", "kashaya"],
  },
  {
    id: "samvara",
    term: "Samvara",
    termHi: "संवर",
    definition:
      "Samvara is the stoppage of new karmic influx (Ashrava) into the soul. It is achieved through right faith, right knowledge, right conduct, Guptis, Samitis, Dharmas (ten virtues), Anupreksha (twelve contemplations), and Tapa. It is the fourth of the nine Jain Tattvas and a critical stage on the path to liberation.",
    definitionHi:
      "संवर का अर्थ है नए कर्मों का आत्मा में आना रोकना। यह गुप्ति, समिति, धर्म, अनुप्रेक्षा और तप के माध्यम से साधा जाता है। यह नौ तत्त्वों में से चौथा है।",
    category: "Philosophy",
    relatedTerms: ["ashrava", "nirjara", "karma", "tapa", "gupti"],
  },
  {
    id: "nirjara",
    term: "Nirjara",
    termHi: "निर्जरा",
    definition:
      "Nirjara is the shedding or exhaustion of previously accumulated karma from the soul. It can be Sakama Nirjara (deliberate, through austerity and meditation) or Akama Nirjara (natural karmic exhaustion over time). Deliberate Nirjara through Tapa is considered far more efficient in accelerating liberation.",
    definitionHi:
      "निर्जरा का अर्थ है पहले से बंधे हुए कर्मों का आत्मा से अलग होना। यह सकाम (तप-ध्यान द्वारा) और अकाम (समय के साथ स्वतः) दोनों प्रकार की होती है। सकाम निर्जरा अधिक प्रभावशाली है।",
    category: "Philosophy",
    relatedTerms: ["karma", "samvara", "ashrava", "tapa", "moksha"],
  },
  {
    id: "kashaya",
    term: "Kashaya",
    termHi: "कषाय",
    definition:
      "Kashaya refers to the four passions in Jainism—anger (krodha), ego (mana), deceit (maya), and greed (lobha)—that defile the soul and cause karmic influx. They are the root cause of bondage. Overcoming Kashayas through ethical conduct and meditation is central to Jain spiritual practice.",
    definitionHi:
      "कषाय चार मानसिक विकार हैं—क्रोध, मान, माया और लोभ—जो आत्मा को मलिन करते हैं और कर्म बंधन का मूल कारण हैं। इन्हें जीतना जैन साधना का सार है।",
    category: "Philosophy",
    relatedTerms: ["ashrava", "karma", "samvara", "tapa", "charitra"],
  },
  {
    id: "lesya",
    term: "Lesya",
    termHi: "लेश्या",
    definition:
      "Lesya refers to the coloration or karmic hue of the soul, which reflects its spiritual and emotional state. Jainism recognizes six Lesyas from the most negative to the most positive: Krishna (black), Neel (blue), Kapot (grey), Tejo (red/yellow), Padma (lotus-pink), and Shukla (white). The Shukla Lesya is associated with highest spiritual development.",
    definitionHi:
      "लेश्या आत्मा के कर्म-परिणाम का रंग है जो उसकी भावदशा को दर्शाता है। छः लेश्याएँ हैं: कृष्ण, नील, कपोत (अशुभ) और तेजो, पद्म, शुक्ल (शुभ)। शुक्ल लेश्या सर्वोच्च आध्यात्मिक अवस्था की द्योतक है।",
    category: "Philosophy",
    relatedTerms: ["karma", "atma", "charitra", "tapa"],
  },
  {
    id: "kalpa-sutra",
    term: "Kalpa Sutra",
    termHi: "कल्प सूत्र",
    definition:
      "The Kalpa Sutra is a Shvetambara Jain scripture composed by Acharya Bhadrabahu (around 4th–3rd century BCE). It contains biographies of the 24 Tirthankaras, accounts of Mahavira's life in detail, and rules for ascetic conduct. It is traditionally read aloud during Paryushana by Shvetambara communities.",
    definitionHi:
      "कल्प सूत्र श्वेताम्बर जैन ग्रंथ है जो आचार्य भद्रबाहु रचित है। इसमें 24 तीर्थंकरों का जीवन-वृत्तांत, महावीर की विस्तृत जीवनी और साधु-आचार के नियम हैं। पर्युषण में इसका वाचन किया जाता है।",
    category: "Fundamentals",
    relatedTerms: ["sutra", "paryushana", "tirthankara", "shvetambara"],
  },
  {
    id: "mangalacharana",
    term: "Mangalacharana",
    termHi: "मंगलाचरण",
    definition:
      "Mangalacharana is an auspicious invocatory verse recited at the beginning of a Jain text or ceremony. It typically begins with a salutation to the Namokar Mantra, the Tirthankaras, or the sacred syllable 'Om' in Jain contexts. It sets a sacred tone and is believed to remove obstacles for the listener and speaker.",
    definitionHi:
      "मंगलाचरण किसी जैन ग्रंथ या अनुष्ठान के प्रारंभ में पढ़ी जाने वाली मंगलकारी वंदना है। यह प्रायः णमोकार मंत्र या तीर्थंकरों की स्तुति से शुरू होती है।",
    category: "Rituals",
    relatedTerms: ["namokar-mantra", "stotra", "puja", "gatha"],
  },
  {
    id: "samayika",
    term: "Samayika",
    termHi: "सामायिक",
    definition:
      "Samayika is a Jain vow of equanimity, typically observed for 48 minutes, during which the practitioner sits in meditation and renounces all sinful activities. It is one of the six essential daily duties (Avashyakas) for laypeople and a core practice for monks. Samayika cultivates inner peace and detachment.",
    definitionHi:
      "सामायिक 48 मिनट का एक जैन व्रत है जिसमें साधक समभाव से ध्यान में बैठते हैं और सभी पापों का त्याग करते हैं। यह गृहस्थों के छह आवश्यक कर्तव्यों में से एक है।",
    category: "Rituals",
    relatedTerms: ["pratikraman", "tapa", "charitra", "vrata"],
  },
  {
    id: "jinapalaka",
    term: "Jinapalaka",
    termHi: "जिनपालक",
    definition:
      "Jinapalaka refers to a devotee or trustee who looks after a Jain temple (Jinamandir) and its daily affairs including worship, maintenance, and community services. The role is highly respected in Jain communities and involves organizing festivals, sponsoring puja, and ensuring continuity of religious practice.",
    definitionHi:
      "जिनपालक वह भक्त या ट्रस्टी होता है जो जैन मंदिर की देखभाल करता है—पूजा-पाठ, उत्सव और सामुदायिक सेवाओं का संचालन करता है।",
    category: "Rituals",
    relatedTerms: ["puja", "ashtaprakari-puja", "tirthankara"],
  },
  {
    id: "jinagama",
    term: "Jinagama",
    termHi: "जिनागम",
    definition:
      "Jinagama refers collectively to the entire body of Jain sacred scriptures attributed to or derived from the teachings of the Jinas (Tirthankaras). It encompasses all Agamas, their sub-texts, commentaries, and philosophical treatises. Study of Jinagama is a form of Swadhyaya (self-study) and a path to right knowledge.",
    definitionHi:
      "जिनागम जिनेन्द्र भगवान की शिक्षाओं पर आधारित समस्त जैन शास्त्र-साहित्य का समुच्चय है—आगम, उपागम, टीकाएँ और दार्शनिक ग्रंथ। इनका अध्ययन स्वाध्याय तप है।",
    category: "Fundamentals",
    relatedTerms: ["agama", "anga", "sutra", "tattvartha-sutra"],
  },
  {
    id: "pradakshina",
    term: "Pradakshina",
    termHi: "प्रदक्षिणा",
    definition:
      "Pradakshina is the act of circumambulation—walking around the idol of a Tirthankara in a clockwise direction—performed as a form of reverence during Jain temple worship. Three circumambulations are standard, symbolizing homage to the Ratnatraya (right faith, right knowledge, right conduct).",
    definitionHi:
      "प्रदक्षिणा तीर्थंकर की प्रतिमा के चारों ओर दक्षिणावर्त तीन बार परिक्रमा है। यह तीन रत्नों—सम्यक् दर्शन, ज्ञान, चारित्र—के प्रति श्रद्धा का प्रतीक है।",
    category: "Rituals",
    relatedTerms: [
      "puja",
      "ashtaprakari-puja",
      "samyak-darshan",
      "tirthankara",
    ],
  },
  {
    id: "sadhu",
    term: "Sadhu",
    termHi: "साधु",
    definition:
      "Sadhu is the fifth category of Panch Parmesthi, referring to all Jain monks and nuns who have taken initiation (diksha) and observe the Mahavratas. They lead lives of complete renunciation, wandering without fixed abode, eating only what is offered by householders, and dedicating their lives to spiritual advancement.",
    definitionHi:
      "साधु पंच परमेष्ठी का पाँचवाँ पद है। ये दीक्षित जैन मुनि हैं जो महाव्रतों का पालन करते हैं, पैदल विचरण करते हैं और केवल गृहस्थों से भिक्षा लेकर जीते हैं।",
    category: "Conduct",
    relatedTerms: [
      "panch-parmesthi",
      "namokar-mantra",
      "muniraj",
      "mahavratas",
    ],
  },
  {
    id: "jain-festival",
    term: "Mahavir Jayanti",
    termHi: "महावीर जयंती",
    definition:
      "Mahavir Jayanti celebrates the birth of Lord Mahavira, the 24th Tirthankara, on the 13th day of the bright half of Chaitra (March/April). It is the most important public Jain festival, marked by processions (rath yatras), recitation of scriptures, lectures, charitable acts, and special prayers in Jain temples worldwide.",
    definitionHi:
      "महावीर जयंती भगवान महावीर के जन्म का उत्सव है जो चैत्र शुक्ल त्रयोदशी को मनाया जाता है। रथयात्रा, शास्त्र-वाचन, दान और मंदिरों में विशेष पूजा इस पर्व की विशेषताएँ हैं।",
    category: "Rituals",
    relatedTerms: ["tirthankara", "paryushana", "nataputta"],
  },
  {
    id: "diksha",
    term: "Diksha",
    termHi: "दीक्षा",
    definition:
      "Diksha is the formal initiation ceremony through which a person becomes a Jain monk or nun. It involves renouncing all worldly possessions, shaving the head (by pulling out hair in the Digambar tradition), and taking the five Mahavratas. Diksha is considered a profound act of spiritual courage and commitment.",
    definitionHi:
      "दीक्षा वह संस्कार है जिसमें व्यक्ति सांसारिक जीवन का त्याग कर जैन साधु या साध्वी बनता है। इसमें पाँच महाव्रत ग्रहण किए जाते हैं और दिगम्बर में केशलोंच किया जाता है।",
    category: "Conduct",
    relatedTerms: ["muniraj", "mahavratas", "digambar", "shvetambara"],
  },
  {
    id: "sthanakvasi",
    term: "Sthanakvasi",
    termHi: "स्थानकवासी",
    definition:
      "Sthanakvasi is a sub-sect within Shvetambara Jainism that does not worship idols. They believe that Tirthankaras, having attained liberation, cannot be propitiated through material worship. Their monks and nuns cover their mouths with a muhapatti (mouth-cloth) at all times to prevent inadvertent harm to micro-organisms.",
    definitionHi:
      "स्थानकवासी श्वेताम्बर जैन का एक उप-संप्रदाय है जो मूर्तिपूजा नहीं करता। इनके साधु-साध्वियाँ सदा मुँह पर मुहपत्ती बाँधते हैं। ये मानते हैं कि मुक्त आत्माएँ पूजा से प्रभावित नहीं होतीं।",
    category: "Fundamentals",
    relatedTerms: ["shvetambara", "digambar", "muniraj", "ahimsa"],
  },
];
