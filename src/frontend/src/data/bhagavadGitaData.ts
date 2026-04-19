export interface GitaVerse {
  verseId: string;
  sanskrit: string;
  transliteration: string;
  hindi: string;
  english: string;
  isKeyVerse: boolean;
  keyVerseNote?: string;
}

export interface GitaChapter {
  chapterNumber: number;
  titleSanskrit: string;
  titleEn: string;
  titleHi: string;
  verseCount: number;
  theme: string;
  summary: string;
  representativeVerses: GitaVerse[];
}

export const gitaChapters: GitaChapter[] = [
  {
    chapterNumber: 1,
    titleSanskrit: "अर्जुनविषादयोग",
    titleEn: "Arjuna Vishaad Yoga",
    titleHi: "अर्जुन विषाद योग",
    verseCount: 47,
    theme: "Arjuna's Dilemma",
    summary:
      "On the battlefield of Kurukshetra, Arjuna sees his kinsmen, teachers, and beloved ones arrayed against him in battle. Overwhelmed by grief and compassion, he lays down his bow and refuses to fight. This chapter sets the stage for Krishna's divine teachings, showing the human dilemma of duty versus sentiment.",
    representativeVerses: [
      {
        verseId: "1.1",
        sanskrit:
          "धृतराष्ट्र उवाच |\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥",
        transliteration:
          "dhṛtarāṣṭra uvāca |\ndharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ |\nmāmakāḥ pāṇḍavāś caiva kim akurvata sañjaya",
        hindi:
          "धृतराष्ट्र बोले — हे संजय! धर्मभूमि कुरुक्षेत्र में एकत्रित, युद्ध की इच्छा रखने वाले मेरे और पांडु के पुत्रों ने क्या किया?",
        english:
          "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra, eager to fight?",
        isKeyVerse: false,
      },
      {
        verseId: "1.2",
        sanskrit:
          "सञ्जय उवाच |\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा |\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ॥",
        transliteration:
          "sañjaya uvāca |\ndṛṣṭvā tu pāṇḍavānīkaṃ vyūḍhaṃ duryodhanastadā |\nācāryamupasaṃgamya rājā vacanamabravīt",
        hindi:
          "संजय बोले — तब राजा दुर्योधन ने पांडवों की सेना की व्यूह रचना देखकर आचार्य द्रोण के पास जाकर यह वचन कहा।",
        english:
          "Sanjaya said: Having seen the Pandava army arrayed in battle formation, King Duryodhana then approached his teacher Dronacharya and spoke these words.",
        isKeyVerse: false,
      },
      {
        verseId: "1.3",
        sanskrit:
          "पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम् |\nव्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता ॥",
        transliteration:
          "paśyaitāṃ pāṇḍuputrāṇām ācārya mahatīṃ camūm |\nvyūḍhāṃ drupadaputreṇa tava śiṣyeṇa dhīmatā",
        hindi:
          "हे आचार्य! आपके बुद्धिमान शिष्य द्रुपद-पुत्र धृष्टद्युम्न द्वारा व्यूहबद्ध की गई पांडु-पुत्रों की इस विशाल सेना को देखिए।",
        english:
          "Behold, O teacher, this mighty army of the sons of Pandu, arranged in battle formation by the son of Drupada — your own wise disciple.",
        isKeyVerse: false,
      },
      {
        verseId: "1.4",
        sanskrit:
          "अत्र शूरा महेष्वासा भीमार्जुनसमा युधि |\nयुयुधानो विराटश्च द्रुपदश्च महारथः ॥",
        transliteration:
          "atra śūrā maheṣvāsā bhīmārjunasamā yudhi |\nyuyudhāno virāṭaśca drupadaśca mahārathaḥ",
        hindi:
          "यहाँ भीम और अर्जुन के समान युद्ध में वीर महाधनुर्धर योद्धा हैं — युयुधान (सात्यकि), विराट और महारथी द्रुपद।",
        english:
          "Here are mighty archers equal in battle to Bhima and Arjuna — Yuyudhana, Virata, and the great charioteer Drupada.",
        isKeyVerse: false,
      },
      {
        verseId: "1.5",
        sanskrit:
          "धृष्टकेतुश्चेकितानः काशिराजश्च वीर्यवान् |\nपुरुजित्कुन्तिभोजश्च शैब्यश्च नरपुङ्गवः ॥",
        transliteration:
          "dhṛṣṭaketuś cekitānaḥ kāśirājaś ca vīryavān |\npurujit kuntibhojaś ca śaibyaś ca narapuṃgavaḥ",
        hindi:
          "धृष्टकेतु, चेकितान, वीर्यवान् काशिराज, पुरुजित, कुन्तिभोज और नर-श्रेष्ठ शैब्य भी हैं।",
        english:
          "Dhrishtaketu, Chekitana, and the valiant king of Kashi, Purujit, Kuntibhoja, and Shaibya — the best among men — are all present.",
        isKeyVerse: false,
      },
      {
        verseId: "1.28",
        sanskrit:
          "अर्जुन उवाच |\ndṛṣṭvemaṃ svajanṃ kṛṣṇa yuyutsuṃ samupasthitam |\nsīdanti mama gātrāṇi mukhaṃ ca pariśuṣyati ॥",
        transliteration:
          "arjuna uvāca |\ndṛṣṭvemaṃ svajanaṃ kṛṣṇa yuyutsuṃ samupasthitam |\nsīdanti mama gātrāṇi mukhaṃ ca pariśuṣyati",
        hindi:
          "अर्जुन बोले — हे कृष्ण! इस युद्ध के लिए उत्सुक अपने इन स्वजनों को देखकर मेरे अंग शिथिल पड़ रहे हैं और मुख सूख रहा है।",
        english:
          "Arjuna said: O Krishna, seeing my own kinsmen arrayed here, eager to fight, my limbs fail and my mouth is parched.",
        isKeyVerse: true,
        keyVerseNote:
          "This verse marks the pivotal moment — Arjuna's physical and emotional collapse before battle. It is the starting point of the Gita's teachings.",
      },
      {
        verseId: "1.29",
        sanskrit:
          "वेपथुश्च शरीरे मे रोमहर्षश्च जायते |\nगाण्डीवं स्रंसते हस्तात्त्वक्चैव परिदह्यते ॥",
        transliteration:
          "vepathuś ca śarīre me romaharṣaś ca jāyate |\ngāṇḍīvaṃ sraṃsate hastāt tvak caiva paridahyate",
        hindi:
          "मेरे शरीर में कंपकंपी और रोमांच हो रहा है, हाथ से गांडीव धनुष गिर रहा है, और त्वचा में जलन हो रही है।",
        english:
          "My whole body quivers, my hair stands on end, my bow slips from my hand, my skin burns all over.",
        isKeyVerse: true,
        keyVerseNote:
          "Arjuna's grief manifests physically — a powerful illustration of how emotional turmoil affects the body and mind.",
      },
    ],
  },
  {
    chapterNumber: 2,
    titleSanskrit: "साङ्ख्ययोग",
    titleEn: "Sankhya Yoga",
    titleHi: "सांख्य योग",
    verseCount: 72,
    theme: "The Immortal Soul & Path of Action",
    summary:
      "Krishna begins his divine instruction by revealing the eternal nature of the Atman — the soul that can never be born or die, cut by weapons or burned by fire. He introduces the concept of Nishkama Karma (selfless action without attachment to results) and the Sthitaprajna (person of steady wisdom). This chapter is the philosophical heart of the Bhagavad Gita.",
    representativeVerses: [
      {
        verseId: "2.1",
        sanskrit:
          "सञ्जय उवाच |\ntaṃ tathā kṛpayāviṣṭam aśrupūrṇākulekṣaṇam |\nviṣīdantam idaṃ vākyam uvāca madhusūdanaḥ ॥",
        transliteration:
          "sañjaya uvāca |\ntaṃ tathā kṛpayāviṣṭam aśrupūrṇākulekṣaṇam |\nviṣīdantam idaṃ vākyam uvāca madhusūdanaḥ",
        hindi:
          "संजय बोले — उस प्रकार करुणा से व्याकुल, अश्रुपूर्ण नेत्रों से युक्त और विषाद-ग्रस्त अर्जुन से मधुसूदन ने यह वचन कहा।",
        english:
          "Sanjaya said: To Arjuna, who was thus overcome with pity, whose eyes were full of tears and troubled, and who was despondent, Krishna spoke these words.",
        isKeyVerse: false,
      },
      {
        verseId: "2.2",
        sanskrit:
          "श्रीभगवानुवाच |\nkutastvā kaśmalam idaṃ viṣame samupasthitam |\nanāryajuṣṭam asvargyam akīrtikaram arjuna ॥",
        transliteration:
          "śrī bhagavān uvāca |\nkutastvā kaśmalam idaṃ viṣame samupasthitam |\nanāryajuṣṭam asvargyam akīrtikaram arjuna",
        hindi:
          "श्रीभगवान् बोले — हे अर्जुन! इस विकट समय में यह मोह तुझे कहाँ से प्राप्त हुआ? श्रेष्ठ पुरुष ऐसा नहीं करते, यह न स्वर्ग दिलाता है, न कीर्ति।",
        english:
          "The Blessed Lord said: O Arjuna, whence has this dejection come upon you at this critical moment? It is not fitting for a noble person; it does not lead to heaven and brings only infamy.",
        isKeyVerse: false,
      },
      {
        verseId: "2.3",
        sanskrit:
          "klaibyaṃ mā sma gamaḥ pārtha naitat tvayy upapadyate |\nkṣudraṃ hṛdayadaurbalyaṃ tyaktvottiṣṭha paraṃtapa ॥",
        transliteration:
          "klaibyaṃ mā sma gamaḥ pārtha naitat tvayy upapadyate |\nkṣudraṃ hṛdayadaurbalyaṃ tyaktvottiṣṭha paraṃtapa",
        hindi:
          "हे पार्थ! नपुंसकता को मत प्राप्त हो — यह तुझे शोभा नहीं देती। हे परंतप! हृदय की इस तुच्छ दुर्बलता को छोड़कर उठ खड़े हो।",
        english:
          "Do not yield to impotence, O Partha — it does not befit you. Shake off this faint-heartedness and arise, O scorcher of enemies.",
        isKeyVerse: false,
      },
      {
        verseId: "2.4",
        sanskrit:
          "arjuna uvāca |\nkathaṃ bhīṣmam ahaṃ saṃkhye droṇaṃ ca madhusūdana |\niṣubhiḥ pratiyotsyāmi pūjārhāv arisūdana ॥",
        transliteration:
          "arjuna uvāca |\nkathaṃ bhīṣmam ahaṃ saṃkhye droṇaṃ ca madhusūdana |\niṣubhiḥ pratiyotsyāmi pūjārhāv arisūdana",
        hindi:
          "अर्जुन बोले — हे मधुसूदन! मैं युद्ध में भीष्म और द्रोण जैसे पूजनीय महापुरुषों के विरुद्ध बाणों से कैसे लड़ूं?",
        english:
          "Arjuna said: O Madhusudana, how can I fight with arrows in battle against Bhishma and Drona, who are worthy of worship, O destroyer of enemies?",
        isKeyVerse: false,
      },
      {
        verseId: "2.5",
        sanskrit:
          "gurūn ahatvā hi mahānubhāvān śreyo bhoktum bhaikṣyam apīha loke |\nhatvārthakāmāṃs tu gurūn ihaiva bhuñjīya bhogān rudhirapradigdhān ॥",
        transliteration:
          "gurūn ahatvā hi mahānubhāvān śreyo bhoktum bhaikṣyam apīha loke |\nhatvārthakāmāṃs tu gurūn ihaiva bhuñjīya bhogān rudhirapradigdhān",
        hindi:
          "इन महानुभाव गुरुजनों को न मारकर भीख माँगकर जीना भी इस लोक में श्रेयस्कर है। क्योंकि उन्हें मारकर जो भोग मिलेंगे, वे तो रक्त से सने होंगे।",
        english:
          "It is better to live in this world by begging than to slay these noble elders. By killing them, even if they desire wealth, we would enjoy pleasures stained with blood.",
        isKeyVerse: false,
      },
      {
        verseId: "2.20",
        sanskrit:
          "na jāyate mriyate vā kadācin nāyaṃ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato'yaṃ purāṇo na hanyate hanyamāne śarīre ॥",
        transliteration:
          "na jāyate mriyate vā kadācin nāyaṃ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato 'yaṃ purāṇo na hanyate hanyamāne śarīre",
        hindi:
          "यह आत्मा न कभी जन्म लेता है और न मरता है, न यह होकर फिर न होगा। यह अजन्मा, नित्य, शाश्वत और पुरातन है — शरीर के मारे जाने पर भी यह नहीं मारा जाता।",
        english:
          "The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.",
        isKeyVerse: true,
        keyVerseNote:
          "The most famous verse on the immortality of the Atman. This forms the philosophical foundation for understanding death and reincarnation in Hindu philosophy.",
      },
      {
        verseId: "2.47",
        sanskrit:
          "karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo'stv akarmaṇi ॥",
        transliteration:
          "karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
        hindi:
          "कर्म करना तेरा अधिकार है, फल में कभी नहीं। इसलिए न तू फल का कारण बन और न अकर्म में तेरी आसक्ति हो।",
        english:
          "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to inaction.",
        isKeyVerse: true,
        keyVerseNote:
          "The most quoted verse of the Bhagavad Gita — the principle of Nishkama Karma (action without attachment to results). This verse revolutionized the concept of duty in Indian thought.",
      },
    ],
  },
  {
    chapterNumber: 3,
    titleSanskrit: "कर्मयोग",
    titleEn: "Karma Yoga",
    titleHi: "कर्म योग",
    verseCount: 43,
    theme: "The Yoga of Right Action",
    summary:
      "Krishna explains why action (karma) is superior to inaction. Every individual must perform their duties without attachment. The world is sustained by selfless action — even God acts, setting an example for others. Krishna warns against the enemy of desire and anger, and explains the cycle of yajna (sacrifice) that sustains creation.",
    representativeVerses: [
      {
        verseId: "3.1",
        sanskrit:
          "arjuna uvāca |\njyāyasī cet karmaṇas te matā buddhir janārdana |\ntat kiṃ karmaṇi ghore māṃ niyojayasi keśava ॥",
        transliteration:
          "arjuna uvāca |\njyāyasī cet karmaṇas te matā buddhir janārdana |\ntat kiṃ karmaṇi ghore māṃ niyojayasi keśava",
        hindi:
          "अर्जुन बोले — हे जनार्दन! यदि आप कर्म की अपेक्षा ज्ञान को श्रेष्ठ मानते हैं, तो फिर इस घोर कर्म (युद्ध) में मुझे क्यों लगाते हैं?",
        english:
          "Arjuna said: O Janardana, if you consider knowledge superior to action, then why do you engage me in this horrible war, O Keshava?",
        isKeyVerse: false,
      },
      {
        verseId: "3.2",
        sanskrit:
          "vyāmiśreṇeva vākyena buddhiṃ mohayasīva me |\ntad ekaṃ vada niścitya yena śreyo'ham āpnuyām ॥",
        transliteration:
          "vyāmiśreṇeva vākyena buddhiṃ mohayasīva me |\ntad ekaṃ vada niścitya yena śreyo 'ham āpnuyām",
        hindi:
          "आप मिले-जुले वचनों से मेरी बुद्धि को मोहित कर रहे हैं। उस एक बात को निश्चित करके बताइए जिससे मुझे कल्याण की प्राप्ति हो।",
        english:
          "You seem to confuse my mind with these mixed statements. Tell me definitively that one thing by which I may attain what is truly beneficial.",
        isKeyVerse: false,
      },
      {
        verseId: "3.3",
        sanskrit:
          "śrī bhagavān uvāca |\nloke'smin dvividhā niṣṭhā purā proktā mayānagha |\njñānayogena sāṃkhyānāṃ karmayogena yoginām ॥",
        transliteration:
          "śrī bhagavān uvāca |\nloke 'smin dvividhā niṣṭhā purā proktā mayānagha |\njñānayogena sāṃkhyānāṃ karmayogena yoginām",
        hindi:
          "श्रीभगवान् बोले — हे निष्पाप! इस संसार में मैंने दो प्रकार की निष्ठाएं पहले कही हैं — सांख्यों के लिए ज्ञानयोग और योगियों के लिए कर्मयोग।",
        english:
          "The Blessed Lord said: O sinless one, in this world I declared two paths — the path of knowledge (jnana yoga) for the contemplatives and the path of action (karma yoga) for the active.",
        isKeyVerse: false,
      },
      {
        verseId: "3.4",
        sanskrit:
          "na karmaṇām anārambhān naiṣkarmyaṃ puruṣo'śnute |\nna ca saṃnyasanād eva siddhiṃ samadhigacchati ॥",
        transliteration:
          "na karmaṇām anārambhān naiṣkarmyaṃ puruṣo 'śnute |\nna ca saṃnyasanād eva siddhiṃ samadhigacchati",
        hindi:
          "कर्मों को आरम्भ न करने से मनुष्य निष्कर्मता को नहीं पाता, और न केवल संन्यास से सिद्धि को प्राप्त होता है।",
        english:
          "A person does not attain freedom from action by not starting actions; nor does one attain perfection by merely renouncing action.",
        isKeyVerse: false,
      },
      {
        verseId: "3.5",
        sanskrit:
          "na hi kaścit kṣaṇam api jātu tiṣṭhaty akarma-kṛt |\nkāryate hy avaśaḥ karma sarvaḥ prakṛtijair guṇaiḥ ॥",
        transliteration:
          "na hi kaścit kṣaṇam api jātu tiṣṭhaty akarma-kṛt |\nkāryate hy avaśaḥ karma sarvaḥ prakṛtijair guṇaiḥ",
        hindi:
          "कोई भी व्यक्ति क्षण भर भी बिना कर्म किए नहीं रह सकता। प्रकृति के गुणों के प्रभाव से सभी परवश होकर कर्म करते हैं।",
        english:
          "Indeed, no one can remain without action even for a moment; everyone is driven to action helplessly by the qualities born of material nature.",
        isKeyVerse: false,
      },
      {
        verseId: "3.21",
        sanskrit:
          "yad yad ācarati śreṣṭhas tat tad evetaro janaḥ |\nsa yat pramāṇaṃ kurute lokas tad anuvartate ॥",
        transliteration:
          "yad yad ācarati śreṣṭhas tat tad evetaro janaḥ |\nsa yat pramāṇaṃ kurute lokas tad anuvartate",
        hindi:
          "श्रेष्ठ पुरुष जो-जो आचरण करता है, साधारण मनुष्य भी वही-वही करते हैं। वह जो प्रमाण (मानक) स्थापित करता है, जगत् उसी का अनुसरण करता है।",
        english:
          "Whatever actions a great person performs, common people follow. Whatever standards they set by exemplary acts, the world follows.",
        isKeyVerse: true,
        keyVerseNote:
          "The principle of leading by example. A leader's conduct shapes society. This verse is the basis of the concept of 'role model' in Indian thought.",
      },
    ],
  },
  {
    chapterNumber: 4,
    titleSanskrit: "ज्ञानकर्मसंन्यासयोग",
    titleEn: "Jnana Karma Sanyasa Yoga",
    titleHi: "ज्ञान कर्म संन्यास योग",
    verseCount: 42,
    theme: "Knowledge, Action & Renunciation",
    summary:
      "Krishna reveals the ancient lineage of this teaching and the mystery of his divine births. He explains the purpose of his incarnations — to restore dharma whenever it declines. He describes the transcendental nature of his actions, the fire sacrifice of knowledge, and how true knowledge burns all karma to ashes.",
    representativeVerses: [
      {
        verseId: "4.1",
        sanskrit:
          "śrī bhagavān uvāca |\nimaṃ vivasvate yogaṃ proktavān aham avyayam |\nvivasvān manave prāha manur ikṣvākave'bravīt ॥",
        transliteration:
          "śrī bhagavān uvāca |\nimaṃ vivasvate yogaṃ proktavān aham avyayam |\nvivasvān manave prāha manur ikṣvākave 'bravīt",
        hindi:
          "श्रीभगवान् बोले — मैंने यह अविनाशी योग सूर्यदेव विवस्वान् को उपदेश दिया, विवस्वान् ने मनु को और मनु ने इक्ष्वाकु को बताया।",
        english:
          "The Blessed Lord said: I instructed this imperishable knowledge of yoga to the sun-god Vivasvan; Vivasvan instructed it to Manu, the father of mankind; and Manu instructed it to Ikshvaku.",
        isKeyVerse: false,
      },
      {
        verseId: "4.2",
        sanskrit:
          "evaṃ paramparāprāptam imaṃ rājarṣayo viduḥ |\nsa kāleneha mahatā yogo naṣṭaḥ parantapa ॥",
        transliteration:
          "evaṃ paramparāprāptam imaṃ rājarṣayo viduḥ |\nsa kāleneha mahatā yogo naṣṭaḥ parantapa",
        hindi:
          "इस प्रकार परम्परा से प्राप्त इस योग को राजर्षियों ने जाना। परंतु हे परंतप! बहुत काल बीतने से वह योग इस लोक में नष्ट हो गया।",
        english:
          "This supreme science was thus received through the chain of disciplic succession, and the saintly kings understood it. But in course of time this knowledge was broken, O Parantapa.",
        isKeyVerse: false,
      },
      {
        verseId: "4.3",
        sanskrit:
          "sa evāyaṃ mayā te'dya yogaḥ proktaḥ purātanaḥ |\nbhakto'si me sakhā ceti rahasyaṃ hy etad uttamam ॥",
        transliteration:
          "sa evāyaṃ mayā te 'dya yogaḥ proktaḥ purātanaḥ |\nbhakto 'si me sakhā ceti rahasyaṃ hy etad uttamam",
        hindi:
          "तू मेरा भक्त और प्रिय सखा है, इसीलिए वही यह पुरातन योग मैंने आज तुझे बताया है — यह उत्तम रहस्य है।",
        english:
          "That ancient yoga is today declared by Me to you because you are My devotee and My friend — this is the supreme mystery.",
        isKeyVerse: false,
      },
      {
        verseId: "4.4",
        sanskrit:
          "arjuna uvāca |\naparaṃ bhavato janma paraṃ janma vivasvataḥ |\nkatham etad vijānīyāṃ tvam ādau proktavān iti ॥",
        transliteration:
          "arjuna uvāca |\naparaṃ bhavato janma paraṃ janma vivasvataḥ |\nkatham etad vijānīyāṃ tvam ādau proktavān iti",
        hindi:
          "अर्जुन बोले — आपका जन्म तो बाद में हुआ और विवस्वान् का जन्म पहले हुआ। तो मैं यह कैसे समझूँ कि आपने ही प्रारम्भ में यह कहा था?",
        english:
          "Arjuna said: Your birth is later, Vivasvan's birth was prior. How am I to understand that You instructed this science to him in the beginning?",
        isKeyVerse: false,
      },
      {
        verseId: "4.5",
        sanskrit:
          "śrī bhagavān uvāca |\nbahūni me vyatītāni janmāni tava cārjuna |\ntāny ahaṃ veda sarvāṇi na tvaṃ vettha parantapa ॥",
        transliteration:
          "śrī bhagavān uvāca |\nbahūni me vyatītāni janmāni tava cārjuna |\ntāny ahaṃ veda sarvāṇi na tvaṃ vettha parantapa",
        hindi:
          "श्रीभगवान् बोले — हे अर्जुन! मेरे और तेरे बहुत से जन्म हो चुके हैं। उन सबको मैं जानता हूँ, परंतु हे परंतप! तू नहीं जानता।",
        english:
          "The Blessed Lord said: Many births have passed for both you and Me. I know all of them, but you do not know them, O Parantapa.",
        isKeyVerse: false,
      },
      {
        verseId: "4.7",
        sanskrit:
          "yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṃ sṛjāmy aham ॥",
        transliteration:
          "yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṃ sṛjāmy aham",
        hindi:
          "हे भारत! जब-जब धर्म की हानि होती है और अधर्म की वृद्धि होती है, तब-तब मैं अपने आप को प्रकट करता हूँ।",
        english:
          "Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion — at that time I descend Myself.",
        isKeyVerse: true,
        keyVerseNote:
          "The famous promise of divine intervention whenever dharma declines. This verse forms the theological basis for the concept of avatars in Hinduism.",
      },
      {
        verseId: "4.8",
        sanskrit:
          "paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām |\ndharma-saṃsthāpanārthāya sambhavāmi yuge yuge ॥",
        transliteration:
          "paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām |\ndharma-saṃsthāpanārthāya sambhavāmi yuge yuge",
        hindi:
          "साधुजनों की रक्षा करने के लिए, दुष्टों का विनाश करने के लिए और धर्म की पुनः स्थापना करने के लिए मैं युग-युग में जन्म लेता हूँ।",
        english:
          "To deliver the pious, to annihilate the miscreants, and to reestablish the principles of dharma, I advent Myself millennium after millennium.",
        isKeyVerse: true,
        keyVerseNote:
          "Continuing from 4.7 — the complete statement of the divine purpose of each avatar. Together 4.7-4.8 form the most celebrated promise in Hindu scripture.",
      },
    ],
  },
  {
    chapterNumber: 5,
    titleSanskrit: "कर्मसंन्यासयोग",
    titleEn: "Karma Sanyasa Yoga",
    titleHi: "कर्म संन्यास योग",
    verseCount: 29,
    theme: "Renunciation of Action",
    summary:
      "Krishna reconciles the apparent contradiction between renunciation and action. Both paths lead to the same goal — liberation. The true renunciant acts in the world while internally remaining untouched, like the lotus that lives in water but is not wetted. He describes the Brahma-nirvana state and equal vision toward all beings.",
    representativeVerses: [
      {
        verseId: "5.1",
        sanskrit:
          "arjuna uvāca |\nsaṃnyāsaṃ karmaṇāṃ kṛṣṇa punar yogaṃ ca śaṃsasi |\nyac chreya etayor ekaṃ tan me brūhi suniścitam ॥",
        transliteration:
          "arjuna uvāca |\nsaṃnyāsaṃ karmaṇāṃ kṛṣṇa punar yogaṃ ca śaṃsasi |\nyac chreya etayor ekaṃ tan me brūhi suniścitam",
        hindi:
          "अर्जुन बोले — हे कृष्ण! आप कर्मों के संन्यास की और फिर योग (कर्मयोग) की भी प्रशंसा करते हैं। इन दोनों में जो एक निश्चित रूप से श्रेयस्कर हो, वह मुझे बताइए।",
        english:
          "Arjuna said: O Krishna, you praise renunciation of action and also the yoga of action. Tell me definitively which one of these is more beneficial.",
        isKeyVerse: false,
      },
      {
        verseId: "5.2",
        sanskrit:
          "śrī bhagavān uvāca |\nsaṃnyāsaḥ karma-yogaś ca niḥśreyasakarāv ubhau |\ntayor tu karma-saṃnyāsāt karma-yogo viśiṣyate ॥",
        transliteration:
          "śrī bhagavān uvāca |\nsaṃnyāsaḥ karma-yogaś ca niḥśreyasakarāv ubhau |\ntayor tu karma-saṃnyāsāt karma-yogo viśiṣyate",
        hindi:
          "श्रीभगवान् बोले — संन्यास और कर्मयोग — दोनों ही परम कल्याण करने वाले हैं। परंतु उन दोनों में कर्मसंन्यास की अपेक्षा कर्मयोग श्रेष्ठ है।",
        english:
          "The Blessed Lord said: Both renunciation and yoga of action lead to supreme liberation. But of the two, karma yoga is better than renunciation of action.",
        isKeyVerse: false,
      },
      {
        verseId: "5.3",
        sanskrit:
          "jñeyaḥ sa nitya-saṃnyāsī yo na dveṣṭi na kāṅkṣati |\nnirdvandvo hi mahābāho sukhaṃ bandhāt pramucyate ॥",
        transliteration:
          "jñeyaḥ sa nitya-saṃnyāsī yo na dveṣṭi na kāṅkṣati |\nnirdvandvo hi mahābāho sukhaṃ bandhāt pramucyate",
        hindi:
          "हे महाबाहो! जो न द्वेष करता है और न आकांक्षा रखता है, वह नित्य संन्यासी जानने योग्य है। द्वंद्वों से रहित वह सुखपूर्वक बंधन से मुक्त हो जाता है।",
        english:
          "He who neither hates nor desires the fruits of actions is known as always renounced. Such a person, free from all dualities, O mighty-armed, is easily liberated from bondage.",
        isKeyVerse: false,
      },
      {
        verseId: "5.4",
        sanskrit:
          "sāṃkhya-yogau pṛthag bālāḥ pravadanti na paṇḍitāḥ |\nekam apy āsthitaḥ samyag ubhayor vindate phalam ॥",
        transliteration:
          "sāṃkhya-yogau pṛthag bālāḥ pravadanti na paṇḍitāḥ |\nekam apy āsthitaḥ samyag ubhayor vindate phalam",
        hindi:
          "सांख्य और योग को अलग-अलग बालक कहते हैं, पंडित नहीं। दोनों में से किसी एक में भी अच्छी तरह स्थित होने पर दोनों का फल पाया जाता है।",
        english:
          "Only the ignorant say that Sankhya and Yoga are different; the wise do not. One who is truly established in either path obtains the results of both.",
        isKeyVerse: false,
      },
      {
        verseId: "5.5",
        sanskrit:
          "yat sāṃkhyaiḥ prāpyate sthānaṃ tad yogair api gamyate |\nekaṃ sāṃkhyaṃ ca yogaṃ ca yaḥ paśyati sa paśyati ॥",
        transliteration:
          "yat sāṃkhyaiḥ prāpyate sthānaṃ tad yogair api gamyate |\nekaṃ sāṃkhyaṃ ca yogaṃ ca yaḥ paśyati sa paśyati",
        hindi:
          "सांख्यों द्वारा जो स्थान प्राप्त होता है, वही योगियों द्वारा भी प्राप्त होता है। जो सांख्य और योग को एक देखता है, वही वास्तव में देखता है।",
        english:
          "The state attained by Sankhya is also reached by Yoga. One who sees that both are one truly sees.",
        isKeyVerse: false,
      },
      {
        verseId: "5.18",
        sanskrit:
          "vidyāvinayasampanne brāhmaṇe gavi hastini |\nśuni caiva śvapāke ca paṇḍitāḥ samadarśinaḥ ॥",
        transliteration:
          "vidyāvinayasampanne brāhmaṇe gavi hastini |\nśuni caiva śvapāke ca paṇḍitāḥ samadarśinaḥ",
        hindi:
          "ज्ञानी पुरुष विद्या और विनय से संपन्न ब्राह्मण में, गाय में, हाथी में, कुत्ते में और चांडाल में भी समान दृष्टि रखते हैं।",
        english:
          "The wise, with equal vision, see a learned and humble brahmin, a cow, an elephant, a dog, and a dog-eater as the same.",
        isKeyVerse: true,
        keyVerseNote:
          "The concept of Sama-Darshana — seeing the divine equally in all beings. This verse is the basis of Vedantic universalism and Hindu respect for all life.",
      },
    ],
  },
  {
    chapterNumber: 6,
    titleSanskrit: "आत्मसंयमयोग",
    titleEn: "Atma Sanyam Yoga",
    titleHi: "आत्म संयम योग",
    verseCount: 47,
    theme: "Meditation & Self-Control",
    summary:
      "Krishna describes the practice of dhyana (meditation) in detail — the posture, the place, the focus, and the gradual stilling of the mind. He addresses Arjuna's doubt about what happens to a sincere spiritual seeker who fails to complete the path. The chapter concludes with the supreme yogi being one who sees himself in all beings.",
    representativeVerses: [
      {
        verseId: "6.1",
        sanskrit:
          "śrī bhagavān uvāca |\nanāśritaḥ karma-phalaṃ kāryaṃ karma karoti yaḥ |\nsa saṃnyāsī ca yogī ca na niragnir na cākriyaḥ ॥",
        transliteration:
          "śrī bhagavān uvāca |\nanāśritaḥ karma-phalaṃ kāryaṃ karma karoti yaḥ |\nsa saṃnyāsī ca yogī ca na niragnir na cākriyaḥ",
        hindi:
          "श्रीभगवान् बोले — जो कर्तव्य कर्म करते हुए उसके फल का आश्रय नहीं लेता, वही संन्यासी और योगी है — न वह जो अग्नि जलाता नहीं और न जो क्रिया नहीं करता।",
        english:
          "The Blessed Lord said: One who performs duties without dependence on the fruits of action is both a renunciant and a yogi — not one who has merely given up fire-rituals or ceased from action.",
        isKeyVerse: false,
      },
      {
        verseId: "6.5",
        sanskrit:
          "uddhared ātmanātmānaṃ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ॥",
        transliteration:
          "uddhared ātmanātmānaṃ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
        hindi:
          "अपने द्वारा अपना उद्धार करे, अपने आप को अधोगति में न डाले। क्योंकि आत्मा ही अपना मित्र है और आत्मा ही अपना शत्रु है।",
        english:
          "Let a person elevate themselves by their own mind; let them not degrade themselves, for the self alone is the friend of oneself and the self alone is the enemy of oneself.",
        isKeyVerse: true,
        keyVerseNote:
          "The principle of self-responsibility in spiritual growth. You are your own best friend and worst enemy — a cornerstone of Vedantic psychology.",
      },
      {
        verseId: "6.47",
        sanskrit:
          "yoginām api sarveṣāṃ mad-gatenāntarātmanā |\nśraddhāvān bhajate yo māṃ sa me yuktatamo mataḥ ॥",
        transliteration:
          "yoginām api sarveṣāṃ mad-gatenāntarātmanā |\nśraddhāvān bhajate yo māṃ sa me yuktatamo mataḥ",
        hindi:
          "सभी योगियों में से जो श्रद्धावान् मुझमें मन लगाकर मेरी भक्ति करता है, वह मुझे सर्वश्रेष्ठ योगी मान्य है।",
        english:
          "Of all yogis, one who worships Me with great faith, with inner self fixed in Me — I consider that yogi to be the most perfectly united with Me.",
        isKeyVerse: true,
        keyVerseNote:
          "The conclusion of Chapter 6: among all spiritual paths, the devotional yogi who surrenders to God with love and faith is declared supreme.",
      },
    ],
  },
  {
    chapterNumber: 7,
    titleSanskrit: "ज्ञानविज्ञानयोग",
    titleEn: "Jnana Vijnana Yoga",
    titleHi: "ज्ञान विज्ञान योग",
    verseCount: 30,
    theme: "Knowledge and Wisdom of God",
    summary:
      "Krishna reveals his two natures — the lower eight-fold material nature (earth, water, fire, air, space, mind, intellect, ego) and the higher spiritual nature that sustains all life. He describes the four types of devotees who come to him and the supreme rarity of one who truly knows him. He is the thread that runs through all creation.",
    representativeVerses: [
      {
        verseId: "7.7",
        sanskrit:
          "mattaḥ parataraṃ nānyat kiñcid asti dhanañjaya |\nmayi sarvam idaṃ protaṃ sūtre maṇi-gaṇā iva ॥",
        transliteration:
          "mattaḥ parataraṃ nānyat kiñcid asti dhanañjaya |\nmayi sarvam idaṃ protaṃ sūtre maṇi-gaṇā iva",
        hindi:
          "हे धनंजय! मुझसे परे कुछ भी नहीं है। जैसे धागे में मणियाँ पिरोई जाती हैं, वैसे यह सब मुझमें पिरोया हुआ है।",
        english:
          "O Dhananjaya, there is nothing higher than Me. All this is strung in Me as gems on a thread.",
        isKeyVerse: true,
        keyVerseNote:
          "One of the most beautiful metaphors in the Gita — God as the thread holding all creation together.",
      },
    ],
  },
  {
    chapterNumber: 8,
    titleSanskrit: "अक्षरब्रह्मयोग",
    titleEn: "Akshar Brahma Yoga",
    titleHi: "अक्षर ब्रह्म योग",
    verseCount: 28,
    theme: "The Imperishable Brahman",
    summary:
      "Krishna answers Arjuna's questions about Brahman, Adhyatma, Karma, and Adhibhuta. He explains that whatever one remembers at the moment of death, that they become. He reveals the path of no-return (devayana) and the path of return (pitriyana), and describes the supreme state beyond the cycle of birth and death.",
    representativeVerses: [
      {
        verseId: "8.5",
        sanskrit:
          "anta-kāle ca mām eva smaran muktvā kalevaram |\nyaḥ prayāti sa mad-bhāvaṃ yāti nāsty atra saṃśayaḥ ॥",
        transliteration:
          "anta-kāle ca mām eva smaran muktvā kalevaram |\nyaḥ prayāti sa mad-bhāvaṃ yāti nāsty atra saṃśayaḥ",
        hindi:
          "जो पुरुष अंत काल में भी मुझे याद करते हुए शरीर छोड़ता है, वह मेरे भाव को प्राप्त होता है — इसमें कोई संदेह नहीं।",
        english:
          "Whoever, at the time of death, gives up their body while remembering Me alone reaches My divine nature. There is no doubt about this.",
        isKeyVerse: true,
        keyVerseNote:
          "The teaching on last thoughts determining the next life. This verse forms the basis of the Antim Smaran (final remembrance) practice in Hindu tradition.",
      },
    ],
  },
  {
    chapterNumber: 9,
    titleSanskrit: "राजविद्याराजगुह्ययोग",
    titleEn: "Raja Vidya Raja Guhya Yoga",
    titleHi: "राज विद्या राज गुह्य योग",
    verseCount: 34,
    theme: "The Royal Knowledge",
    summary:
      "Krishna reveals the 'royal knowledge' — the most secret and supreme science of devotion. He describes his all-pervading yet transcendent nature, how he sustains all beings yet is not in them. He promises to personally take care of his devotees. Any sincere offering of even a leaf, flower, fruit, or water made with devotion reaches him.",
    representativeVerses: [
      {
        verseId: "9.22",
        sanskrit:
          "ananyāś cintayanto māṃ ye janāḥ paryupāsate |\nteṣāṃ nityābhiyuktānāṃ yoga-kṣemaṃ vahāmy aham ॥",
        transliteration:
          "ananyāś cintayanto māṃ ye janāḥ paryupāsate |\nteṣāṃ nityābhiyuktānāṃ yoga-kṣemaṃ vahāmy aham",
        hindi:
          "जो अनन्य भाव से मेरा चिंतन करते हुए मुझे उपासते हैं, उन नित्य-युक्त भक्तों का योग-क्षेम मैं वहन करता हूँ।",
        english:
          "For those who worship Me with devotion, meditating on My transcendental form, I carry what they lack and preserve what they have.",
        isKeyVerse: true,
        keyVerseNote:
          "Krishna's direct promise to personally care for his devoted followers — the source of the tradition of complete surrender (Sharanagati) in Vaishnavism.",
      },
    ],
  },
  {
    chapterNumber: 10,
    titleSanskrit: "विभूतियोग",
    titleEn: "Vibhuti Yoga",
    titleHi: "विभूति योग",
    verseCount: 42,
    theme: "The Divine Manifestations",
    summary:
      "Krishna enumerates his divine opulences and manifestations in the world. Among the Vedas he is Sama Veda; among senses he is the mind; among rivers he is the Ganges; among seasons he is spring. Wherever excellence is found, know that to be a spark of his divine glory. This chapter teaches us to see God in excellence.",
    representativeVerses: [
      {
        verseId: "10.20",
        sanskrit:
          "aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ |\naham ādiś ca madhyaṃ ca bhūtānām anta eva ca ॥",
        transliteration:
          "aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ |\naham ādiś ca madhyaṃ ca bhūtānām anta eva ca",
        hindi:
          "हे गुडाकेश! मैं समस्त प्राणियों के हृदय में स्थित आत्मा हूँ। मैं ही समस्त प्राणियों का आदि, मध्य और अंत भी हूँ।",
        english:
          "I am the Self, O Gudakesha, seated in the hearts of all creatures. I am the beginning, the middle, and the end of all beings.",
        isKeyVerse: true,
        keyVerseNote:
          "Krishna's declaration of his identity as the universal Atman — simultaneously transcendent and immanent in all of creation.",
      },
    ],
  },
  {
    chapterNumber: 11,
    titleSanskrit: "विश्वरूपदर्शनयोग",
    titleEn: "Vishwaroopa Darshan Yoga",
    titleHi: "विश्वरूप दर्शन योग",
    verseCount: 55,
    theme: "The Cosmic Universal Form",
    summary:
      "This chapter contains the most dramatic moment of the Gita — Arjuna's vision of Krishna's universal cosmic form with thousands of faces, eyes, and arms containing all of creation. Arjuna sees past, present, and future, and is overwhelmed. He asks Krishna to return to his gentle human form. The chapter ends with Krishna declaring that only through pure devotion can he be known.",
    representativeVerses: [
      {
        verseId: "11.54",
        sanskrit:
          "bhaktyā tv ananyayā śakya aham evaṃ-vidho'rjuna |\njñātuṃ draṣṭuṃ ca tattvena praveṣṭuṃ ca parantapa ॥",
        transliteration:
          "bhaktyā tv ananyayā śakya aham evaṃ-vidho 'rjuna |\njñātuṃ draṣṭuṃ ca tattvena praveṣṭuṃ ca parantapa",
        hindi:
          "हे परंतप अर्जुन! इस प्रकार के मुझे, अनन्य भक्ति द्वारा ही जाना जा सकता है, देखा जा सकता है, और वास्तव में प्रवेश भी किया जा सकता है।",
        english:
          "But by undivided devotion alone can I be known and seen in this form, O Parantha, and entered into, O scorcher of enemies.",
        isKeyVerse: true,
        keyVerseNote:
          "After showing the awesome Vishwaroopa, Krishna declares that only Bhakti (pure devotion) — not Vedic study, austerity, or charity — truly reveals him.",
      },
    ],
  },
  {
    chapterNumber: 12,
    titleSanskrit: "भक्तियोग",
    titleEn: "Bhakti Yoga",
    titleHi: "भक्ति योग",
    verseCount: 20,
    theme: "The Yoga of Devotion",
    summary:
      "The shortest and sweetest chapter of the Gita, often called the most beautiful. Arjuna asks whether worshipping the personal form (Saguna) or the impersonal (Nirguna) Brahman is better. Krishna says the personal path is easier and declares the qualities of the devotee most dear to him — free from hatred, equal to all, content, not agitated by others.",
    representativeVerses: [
      {
        verseId: "12.13",
        sanskrit:
          "adveṣṭā sarva-bhūtānāṃ maitraḥ karuṇa eva ca |\nnirmamo nirahaṃkāraḥ sama-duḥkha-sukhaḥ kṣamī ॥",
        transliteration:
          "adveṣṭā sarva-bhūtānāṃ maitraḥ karuṇa eva ca |\nnirmamo nirahaṃkāraḥ sama-duḥkha-sukhaḥ kṣamī",
        hindi:
          "जो सभी प्राणियों से द्वेष नहीं करता, जो सबका मित्र और दयालु है, 'मेरा' और अहंकार से रहित है, सुख-दुःख में समान है और क्षमाशील है।",
        english:
          "One who is not envious of any being, who is friendly and compassionate, without possessiveness, without ego, equal in pleasure and pain, forgiving.",
        isKeyVerse: true,
        keyVerseNote:
          "The beginning of Krishna's celebrated description of the ideal devotee — 12.13-12.20 lists the qualities of the person dearest to God.",
      },
    ],
  },
  {
    chapterNumber: 13,
    titleSanskrit: "क्षेत्रक्षेत्रज्ञविभागयोग",
    titleEn: "Kshetra Kshetrajna Vibhaga Yoga",
    titleHi: "क्षेत्र क्षेत्रज्ञ विभाग योग",
    verseCount: 35,
    theme: "Field & the Knower of the Field",
    summary:
      "Krishna introduces the distinction between Kshetra (the field — the body and all material reality) and Kshetrajna (the knower of the field — the conscious soul). He lists the 24 qualities that constitute knowledge and explains the three modes of nature (gunas). The one who truly sees the supreme soul equally in all beings attains liberation.",
    representativeVerses: [
      {
        verseId: "13.27",
        sanskrit:
          "samaṃ sarveṣu bhūteṣu tiṣṭhantaṃ parameśvaram |\nvinaśyatsv avinaśyantaṃ yaḥ paśyati sa paśyati ॥",
        transliteration:
          "samaṃ sarveṣu bhūteṣu tiṣṭhantaṃ parameśvaram |\nvinaśyatsv avinaśyantaṃ yaḥ paśyati sa paśyati",
        hindi:
          "जो पुरुष नाशवान् सभी प्राणियों में परमेश्वर को समान रूप से स्थित और अविनाशी देखता है, वही वास्तव में देखता है।",
        english:
          "One who sees the Supreme Lord dwelling equally in all beings — the imperishable within the perishable — that one truly sees.",
        isKeyVerse: true,
        keyVerseNote:
          "The culmination of Chapter 13 — seeing the eternal, unchanging divine presence equally in all mortal, changing forms is the highest wisdom.",
      },
    ],
  },
  {
    chapterNumber: 14,
    titleSanskrit: "गुणत्रयविभागयोग",
    titleEn: "Guna Traya Vibhaga Yoga",
    titleHi: "गुण त्रय विभाग योग",
    verseCount: 27,
    theme: "The Three Modes of Nature",
    summary:
      "Krishna explains the three gunas — Sattva (purity/goodness), Rajas (passion/activity), and Tamas (darkness/inertia). These three qualities of material nature bind the soul to the body. He describes how each guna manifests in behavior, death, and rebirth. One who transcends all three gunas through devotion attains the imperishable Brahman.",
    representativeVerses: [
      {
        verseId: "14.26",
        sanskrit:
          "māṃ ca yo'vyabhicāreṇa bhakti-yogena sevate |\nsa guṇān samatītyaitān brahma-bhūyāya kalpate ॥",
        transliteration:
          "māṃ ca yo 'vyabhicāreṇa bhakti-yogena sevate |\nsa guṇān samatītyaitān brahma-bhūyāya kalpate",
        hindi:
          "जो पुरुष अव्यभिचारिणी भक्तियोग से मेरी सेवा करता है, वह इन तीनों गुणों को पार करके ब्रह्म बनने का अधिकारी हो जाता है।",
        english:
          "One who worships Me with unfailing devotional service transcends all three modes of material nature and becomes fit to attain Brahman.",
        isKeyVerse: true,
        keyVerseNote:
          "Bhakti (devotion) is declared as the supreme path to transcend all three gunas and attain liberation — the bridge between the human and divine.",
      },
    ],
  },
  {
    chapterNumber: 15,
    titleSanskrit: "पुरुषोत्तमयोग",
    titleEn: "Purushottama Yoga",
    titleHi: "पुरुषोत्तम योग",
    verseCount: 20,
    theme: "The Supreme Person",
    summary:
      "Using the metaphor of an inverted Ashvattha tree (roots above, branches below) — the cosmic tree of samsara — Krishna explains the structure of material existence. He distinguishes between the perishable (Kshara), the imperishable (Akshara), and the supreme Purushottama who transcends both. He declares himself to be that supreme Purushottama.",
    representativeVerses: [
      {
        verseId: "15.15",
        sanskrit:
          "sarvasya cāhaṃ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṃ ca |\nvedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham ॥",
        transliteration:
          "sarvasya cāhaṃ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṃ ca |\nvedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham",
        hindi:
          "मैं सबके हृदय में स्थित हूँ, मुझसे ही स्मृति, ज्ञान और अपोहन (संशय-निवृत्ति) होते हैं। समस्त वेदों द्वारा मैं ही जाना जाने योग्य हूँ, वेदांत का कर्ता और वेद का जानने वाला भी मैं ही हूँ।",
        english:
          "I am seated in the hearts of all. From Me come memory, knowledge, and their loss. I am to be known by all the Vedas; I alone am the author of Vedanta, and I am the knower of the Vedas.",
        isKeyVerse: true,
        keyVerseNote:
          "Krishna declares himself as the inner teacher dwelling in all hearts, the ultimate subject of all Vedic knowledge — the Antaryami (inner controller).",
      },
    ],
  },
  {
    chapterNumber: 16,
    titleSanskrit: "दैवासुरसम्पद्विभागयोग",
    titleEn: "Daivasura Sampat Vibhaga Yoga",
    titleHi: "दैवासुर संपद विभाग योग",
    verseCount: 24,
    theme: "Divine and Demonic Qualities",
    summary:
      "Krishna distinguishes between divine qualities (fearlessness, purity, compassion, straightforwardness, service, knowledge) and demoniac qualities (arrogance, pride, excessive desire, cruelty, impurity). He explains the fourfold descent: desire, anger, greed — the three gates to hell. Those with divine qualities progress toward liberation; those with demonic qualities are trapped.",
    representativeVerses: [
      {
        verseId: "16.1",
        sanskrit:
          "śrī bhagavān uvāca |\nabhayaṃ sattva-saṃśuddhir jñāna-yoga-vyavasthitiḥ |\ndānaṃ damaś ca yajñaś ca svādhyāyas tapa ārjavam ॥",
        transliteration:
          "śrī bhagavān uvāca |\nabhayaṃ sattva-saṃśuddhir jñāna-yoga-vyavasthitiḥ |\ndānaṃ damaś ca yajñaś ca svādhyāyas tapa ārjavam",
        hindi:
          "श्रीभगवान् बोले — अभय, सत्त्व की शुद्धि, ज्ञान-योग में स्थिति, दान, दम, यज्ञ, स्वाध्याय, तप और सरलता।",
        english:
          "The Blessed Lord said: Fearlessness, purification of one's existence, cultivation of spiritual knowledge, charity, self-control, sacrifice, study of the Vedas, austerity, and simplicity.",
        isKeyVerse: true,
        keyVerseNote:
          "The opening of the celebrated list of divine qualities — a complete checklist for human excellence and spiritual development.",
      },
    ],
  },
  {
    chapterNumber: 17,
    titleSanskrit: "श्रद्धात्रयविभागयोग",
    titleEn: "Shraddha Traya Vibhaga Yoga",
    titleHi: "श्रद्धा त्रय विभाग योग",
    verseCount: 28,
    theme: "The Three Kinds of Faith",
    summary:
      "Krishna explains how faith (shraddha), food, sacrifice, austerity, and charity all correspond to the three gunas. Sattvic faith leads to God; Rajasic faith seeks power and prestige; Tamasic faith worships ghosts and spirits. He introduces the significance of Om Tat Sat as the three-syllable designation of Brahman and their role in all spiritual practice.",
    representativeVerses: [
      {
        verseId: "17.23",
        sanskrit:
          "oṃ tat sad iti nirdeśo brahmaṇas tri-vidhaḥ smṛtaḥ |\nbrāhmaṇās tena vedāś ca yajñāś ca vihitāḥ purā ॥",
        transliteration:
          "oṃ tat sad iti nirdeśo brahmaṇas tri-vidhaḥ smṛtaḥ |\nbrāhmaṇās tena vedāś ca yajñāś ca vihitāḥ purā",
        hindi:
          "ॐ, तत्, सत् — यह ब्रह्म का त्रिविध निर्देशन माना गया है। इसी से प्राचीन काल में ब्राह्मण, वेद और यज्ञ विहित किए गए थे।",
        english:
          "Om, Tat, Sat — these three words represent Brahman. By them were the brahmins, the Vedas, and the sacrificial rituals established in ancient times.",
        isKeyVerse: true,
        keyVerseNote:
          "The three sacred syllables that constitute the sacred formula for all Vedic action — Om (the sound of Brahman), Tat (That, the Absolute), Sat (Truth/Reality).",
      },
    ],
  },
  {
    chapterNumber: 18,
    titleSanskrit: "मोक्षसंन्यासयोग",
    titleEn: "Moksha Sanyasa Yoga",
    titleHi: "मोक्ष संन्यास योग",
    verseCount: 78,
    theme: "Liberation Through Renunciation",
    summary:
      "The longest and concluding chapter of the Gita. Krishna summarizes all previous teachings — the nature of renunciation, the three gunas in relation to action, knowledge, doer, intellect, and happiness. He describes the stages from action to knowledge to devotion to total surrender. The chapter ends with the supreme secret: surrender completely to God alone and be freed from all sins.",
    representativeVerses: [
      {
        verseId: "18.1",
        sanskrit:
          "arjuna uvāca |\nsaṃnyāsasya mahābāho tattvam icchāmi veditum |\ntyāgasya ca hṛṣīkeśa pṛthak keśiniṣūdana ॥",
        transliteration:
          "arjuna uvāca |\nsaṃnyāsasya mahābāho tattvam icchāmi veditum |\ntyāgasya ca hṛṣīkeśa pṛthak keśiniṣūdana",
        hindi:
          "अर्जुन बोले — हे महाबाहो! हे हृषीकेश! हे केशिनिषूदन! संन्यास और त्याग का तत्त्व अलग-अलग जानना चाहता हूँ।",
        english:
          "Arjuna said: O mighty-armed one, I wish to understand the nature of renunciation and relinquishment separately, O Hrishikesha, O Keshinishudana.",
        isKeyVerse: false,
      },
      {
        verseId: "18.2",
        sanskrit:
          "śrī bhagavān uvāca |\nkāmyānāṃ karmaṇāṃ nyāsaṃ saṃnyāsaṃ kavayo viduḥ |\nsarva-karma-phala-tyāgaṃ prāhus tyāgaṃ vicakṣaṇāḥ ॥",
        transliteration:
          "śrī bhagavān uvāca |\nkāmyānāṃ karmaṇāṃ nyāsaṃ saṃnyāsaṃ kavayo viduḥ |\nsarva-karma-phala-tyāgaṃ prāhus tyāgaṃ vicakṣaṇāḥ",
        hindi:
          "श्रीभगवान् बोले — काम्य कर्मों के त्याग को विद्वान् 'संन्यास' कहते हैं और सभी कर्मों के फलों के त्याग को विचारशील लोग 'त्याग' कहते हैं।",
        english:
          "The Blessed Lord said: The giving up of activities born of material desire is what great learned men call renunciation. The giving up of the results of all activities is what the wise call relinquishment.",
        isKeyVerse: false,
      },
      {
        verseId: "18.3",
        sanskrit:
          "tyājyaṃ doṣavad ity eke karma prāhur manīṣiṇaḥ |\nyajña-dāna-tapaḥ-karma na tyājyam iti cāpare ॥",
        transliteration:
          "tyājyaṃ doṣavad ity eke karma prāhur manīṣiṇaḥ |\nyajña-dāna-tapaḥ-karma na tyājyam iti cāpare",
        hindi:
          "कुछ विद्वान् कहते हैं कि कर्म दोषयुक्त है इसलिए त्याज्य है। और दूसरे कहते हैं कि यज्ञ, दान और तप के कर्म त्याज्य नहीं हैं।",
        english:
          "Some learned men declare that all kinds of fruitive activities should be given up as faulty. Yet other sages maintain that acts of sacrifice, charity and penance should never be abandoned.",
        isKeyVerse: false,
      },
      {
        verseId: "18.4",
        sanskrit:
          "niścayaṃ śṛṇu me tatra tyāge bharatasattama |\ntyāgo hi puruṣa-vyāghra tri-vidhaḥ samprakīrtitaḥ ॥",
        transliteration:
          "niścayaṃ śṛṇu me tatra tyāge bharatasattama |\ntyāgo hi puruṣa-vyāghra tri-vidhaḥ samprakīrtitaḥ",
        hindi:
          "हे भरतश्रेष्ठ! त्याग के विषय में मेरा निश्चित मत सुनो। हे पुरुषव्याघ्र! त्याग तीन प्रकार का बताया गया है।",
        english:
          "O best of the Bharatas, hear My conclusion on relinquishment. O tiger among men, relinquishment is declared in the scriptures to be of three kinds.",
        isKeyVerse: false,
      },
      {
        verseId: "18.5",
        sanskrit:
          "yajña-dāna-tapaḥ-karma na tyājyaṃ kāryam eva tat |\nyajño dānaṃ tapaś caiva pāvanāni manīṣiṇām ॥",
        transliteration:
          "yajña-dāna-tapaḥ-karma na tyājyaṃ kāryam eva tat |\nyajño dānaṃ tapaś caiva pāvanāni manīṣiṇām",
        hindi:
          "यज्ञ, दान और तप के कर्म त्यागने योग्य नहीं हैं, वे तो करने ही चाहिए। यज्ञ, दान और तप — ये विद्वानों को भी पवित्र करने वाले हैं।",
        english:
          "Acts of sacrifice, charity and penance are not to be given up; they must be performed. Indeed, sacrifice, charity and austerity purify even the great souls.",
        isKeyVerse: false,
      },
      {
        verseId: "18.65",
        sanskrit:
          "man-manā bhava mad-bhakto mad-yājī māṃ namaskuru |\nmām evaiṣyasi satyaṃ te pratijāne priyo'si me ॥",
        transliteration:
          "man-manā bhava mad-bhakto mad-yājī māṃ namaskuru |\nmām evaiṣyasi satyaṃ te pratijāne priyo 'si me",
        hindi:
          "मुझमें मन लगा, मेरा भक्त बन, मेरा पूजन कर और मुझे प्रणाम कर — तो तू मुझे ही प्राप्त होगा, मैं सत्य प्रतिज्ञा करता हूँ। तू मेरा प्रिय है।",
        english:
          "Think of Me, be My devotee, worship Me, bow to Me. So shall you come to Me, I promise you truly, for you are dear to Me.",
        isKeyVerse: true,
        keyVerseNote:
          "Krishna's personal, intimate promise — delivered as a direct appeal to Arjuna. This verse is the heart of the Bhakti tradition.",
      },
      {
        verseId: "18.66",
        sanskrit:
          "sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja |\nahaṃ tvāṃ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ॥",
        transliteration:
          "sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja |\nahaṃ tvāṃ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
        hindi:
          "सभी धर्मों को त्यागकर केवल मेरी शरण में आ। मैं तुझे सभी पापों से मुक्त कर दूंगा — शोक मत कर।",
        english:
          "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
        isKeyVerse: true,
        keyVerseNote:
          "The Charama Shloka (final verse of instruction) — the supreme secret of the Gita. The ultimate message: complete surrender to God. This is the most celebrated verse in the Vaishnava tradition.",
      },
    ],
  },
];

export const gitaOverview = {
  title: "Bhagavad Gita",
  titleSanskrit: "श्रीमद्भगवद्गीता",
  author: "Maharishi Vyasa",
  chapters: 18,
  verses: 700,
  language: "Sanskrit",
  setting: "Kurukshetra Battlefield",
  narrator: "Lord Krishna to Arjuna",
  partOf: "Mahabharata — Bhishma Parva (Ch. 23–40)",
};
