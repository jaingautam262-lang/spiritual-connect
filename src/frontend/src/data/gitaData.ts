// Bhagavad Gita — consolidated data with all 18 chapters
// This file uses the canonical GitaChapterData interface

export interface GitaVerseData {
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  hindi: string;
  english: string;
  wordMeaning?: string;
}

export interface GitaChapterData {
  id: number;
  title: string;
  titleHi: string;
  titleSanskrit: string;
  summary: string;
  summaryHi: string;
  keyTeachings: string[];
  famousVerses: number[];
  whyMattersToday: string;
  faq: { q: string; a: string }[];
  verseCount: number;
  verses: GitaVerseData[];
}

export const gitaData: GitaChapterData[] = [
  {
    id: 1,
    title: "Arjuna Vishada Yoga",
    titleHi: "अर्जुन विषाद योग",
    titleSanskrit: "अर्जुनविषादयोग",
    verseCount: 47,
    summary:
      "On the battlefield of Kurukshetra, Arjuna sees his kinsmen arrayed for battle and is overwhelmed by grief. He drops his bow and refuses to fight, setting the stage for Krishna's divine teachings.",
    summaryHi:
      "कुरुक्षेत्र के युद्धक्षेत्र में अर्जुन अपने सगे-संबंधियों को युद्ध के लिए खड़ा देखकर शोक से विह्वल हो जाता है। वह धनुष रखकर युद्ध करने से इंकार करता है और कृष्ण के दिव्य उपदेश का आधार तैयार होता है।",
    keyTeachings: [
      "Human dilemma: duty versus personal sentiment is a universal struggle",
      "Grief and confusion are natural reactions but not the final word",
      "The battlefield represents life's daily inner conflicts",
      "Seeking guidance from a wise teacher is itself an act of courage",
      "Compassion for others, even enemies, is honourable — but paralysis is not",
    ],
    famousVerses: [28, 32, 46],
    whyMattersToday:
      "Every person faces moments of paralysis when confronting difficult duties. Arjuna's crisis mirrors our modern conflict between personal emotions and societal obligations. The Gita teaches that acknowledging confusion is the first step toward clarity. Seeking guidance when overwhelmed is wisdom, not weakness.",
    faq: [
      {
        q: "Why did Arjuna refuse to fight?",
        a: "Arjuna was overwhelmed by compassion for his relatives and teachers on the opposing side. He feared the sin of killing them and doubted whether victory was worth such loss.",
      },
      {
        q: "What is Vishada Yoga?",
        a: "Vishada means grief or despondency. This first chapter is called Vishada Yoga because Arjuna's grief and surrender to Krishna became the catalyst for receiving divine wisdom.",
      },
      {
        q: "Is this chapter relevant to non-warriors?",
        a: "Absolutely. The battlefield symbolises any challenging situation in life. The conflict Arjuna faces — duty vs. emotion — is universal and timeless.",
      },
      {
        q: "What does Arjuna's grief teach us?",
        a: "It teaches that even the greatest warriors experience doubt and fear. Acknowledging these feelings and seeking guidance is the path forward.",
      },
    ],
    verses: [
      {
        chapter: 1,
        verse: 1,
        sanskrit:
          "धृतराष्ट्र उवाच |\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥",
        transliteration:
          "dhṛtarāṣṭra uvāca |\ndharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ |\nmāmakāḥ pāṇḍavāś caiva kim akurvata sañjaya",
        hindi:
          "धृतराष्ट्र बोले — हे संजय! धर्मभूमि कुरुक्षेत्र में एकत्रित, युद्ध की इच्छा रखने वाले मेरे और पांडु के पुत्रों ने क्या किया?",
        english:
          "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra, eager to fight?",
      },
      {
        chapter: 1,
        verse: 28,
        sanskrit:
          "अर्जुन उवाच |\nदृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम् |\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति ॥",
        transliteration:
          "arjuna uvāca |\ndṛṣṭvemaṃ svajanaṃ kṛṣṇa yuyutsuṃ samupasthitam |\nsīdanti mama gātrāṇi mukhaṃ ca pariśuṣyati",
        hindi:
          "अर्जुन बोले — हे कृष्ण! इन अपने स्वजनों को युद्ध के लिए उत्सुक देखकर मेरे अंग शिथिल हो रहे हैं और मुँह सूख रहा है।",
        english:
          "Arjuna said: O Krishna, seeing my own kinsmen arrayed here eager to fight, my limbs fail and my mouth is parched.",
      },
      {
        chapter: 1,
        verse: 29,
        sanskrit:
          "वेपथुश्च शरीरे मे रोमहर्षश्च जायते |\nगाण्डीवं स्रंसते हस्तात्त्वक्चैव परिदह्यते ॥",
        transliteration:
          "vepathuś ca śarīre me romaharṣaś ca jāyate |\ngāṇḍīvaṃ sraṃsate hastāt tvak caiva paridahyate",
        hindi:
          "मेरे शरीर में कंपन और रोमांच हो रहा है, हाथ से गांडीव धनुष गिर रहा है और त्वचा में जलन हो रही है।",
        english:
          "My whole body quivers, my hair stands on end, my bow slips from my hand, my skin burns all over.",
      },
      {
        chapter: 1,
        verse: 32,
        sanskrit:
          "न काङ्क्षे विजयं कृष्ण न च राज्यं सुखानि च |\nकिं नो राज्येन गोविन्द किं भोगैर्जीवितेन वा ॥",
        transliteration:
          "na kāṅkṣe vijayaṃ kṛṣṇa na ca rājyaṃ sukhāni ca |\nkiṃ no rājyena govinda kiṃ bhogair jīvitena vā",
        hindi:
          "हे कृष्ण! न मैं विजय चाहता हूँ, न राज्य, न सुख। हे गोविन्द! हमें राज्य से क्या, भोग से क्या और जीवन से ही क्या?",
        english:
          "O Krishna, I desire neither victory, nor kingdom, nor pleasures. O Govinda, what good is a kingdom, pleasures, or even life itself?",
      },
      {
        chapter: 1,
        verse: 46,
        sanskrit:
          "यदि मामप्रतीकारमशस्त्रं शस्त्रपाणयः |\nधार्तराष्ट्रा रणे हन्युस्तन्मे क्षेमतरं भवेत् ॥",
        transliteration:
          "yadi mām apratīkāram aśastraṃ śastrapāṇayaḥ |\ndhārtarāṣṭrā raṇe hanyus tan me kṣemataraṃ bhavet",
        hindi:
          "यदि शस्त्रधारी धृतराष्ट्र के पुत्र रण में बिना प्रतिकार के, निहत्थे मुझे मारें, तो यही मेरे लिए अधिक कल्याणकर होगा।",
        english:
          "If the armed sons of Dhritarashtra should slay me unarmed in battle while I remain unresisting, that would be better for me.",
      },
    ],
  },
  {
    id: 2,
    title: "Sankhya Yoga",
    titleHi: "सांख्य योग",
    titleSanskrit: "सांख्ययोग",
    verseCount: 72,
    summary:
      "Krishna imparts the immortality of the soul, the nature of true knowledge, and the concept of Nishkama Karma (desireless action). He describes the sthitaprajna — the person of steady wisdom — as the ideal.",
    summaryHi:
      "कृष्ण आत्मा की अमरता, सच्चे ज्ञान की प्रकृति और निष्काम कर्म का उपदेश देते हैं। वे स्थितप्रज्ञ — स्थिर बुद्धि वाले पुरुष — का आदर्श चित्र प्रस्तुत करते हैं।",
    keyTeachings: [
      "The soul is eternal — it is never born and never dies (2.20)",
      "You have the right to action, never to its fruits (2.47)",
      "Equanimity in success and failure is true yoga",
      "The wise grieve neither for the living nor the dead",
      "The sthitaprajna is unshaken by sorrow, unexcited by joy",
    ],
    famousVerses: [20, 47, 48],
    whyMattersToday:
      "Verse 2.47 — 'You have the right to work, not to the fruits' — is perhaps the most cited management principle from the Gita. In an era of result-obsession, this teaching liberates us to act with full effort without anxiety about outcomes. The concept of the eternal soul brings comfort in grief and reduces fear of death.",
    faq: [
      {
        q: "What does 2.47 mean for daily life?",
        a: "Focus on your effort and process, not on the result. Give your best without anxiety about success or failure. This reduces stress and improves performance.",
      },
      {
        q: "Who is a sthitaprajna?",
        a: "One whose wisdom is not shaken by sorrow or elated by joy. They remain calm and self-controlled in all situations.",
      },
      {
        q: "Is Sankhya philosophy the same as Sankhya yoga?",
        a: "Sankhya here refers to the discriminative knowledge distinguishing the eternal soul from temporary matter, not the classical Sankhya philosophical school.",
      },
      {
        q: "How does the soul-body analogy of changing clothes help?",
        a: "Just as we discard worn clothes for new ones, the soul discards old bodies for new ones. This analogy makes the abstract concept of reincarnation relatable.",
      },
    ],
    verses: [
      {
        chapter: 2,
        verse: 11,
        sanskrit:
          "अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे |\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः ॥",
        transliteration:
          "aśocyān anvaśocas tvaṃ prajñāvādāṃś ca bhāṣase |\ngatāsūn agatāsūṃś ca nānuśocanti paṇḍitāḥ",
        hindi:
          "तू न शोक करने योग्य पर शोक करता है और ज्ञान की बातें करता है। जो जा चुके और जो नहीं गए, उन दोनों के लिए पंडित शोक नहीं करते।",
        english:
          "You grieve for those who should not be grieved for, yet speak words of wisdom. The wise grieve neither for the living nor for the dead.",
      },
      {
        chapter: 2,
        verse: 19,
        sanskrit:
          "य एनं वेत्ति हन्तारं यश्चैनं मन्यते हतम् |\nउभौ तौ न विजानीतो नायं हन्ति न हन्यते ॥",
        transliteration:
          "ya enaṃ vetti hantāraṃ yaś cainaṃ manyate hatam |\nubhau tau na vijānīto nāyaṃ hanti na hanyate",
        hindi:
          "जो इसे मारने वाला समझता है और जो इसे मरा हुआ मानता है — दोनों नहीं जानते। यह आत्मा न मारती है और न मारी जाती है।",
        english:
          "One who thinks this soul is a slayer and one who thinks it is slain — both fail to perceive the truth. This soul neither slays nor is slain.",
      },
      {
        chapter: 2,
        verse: 20,
        sanskrit:
          "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः |\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥",
        transliteration:
          "na jāyate mriyate vā kadācin nāyaṃ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato 'yaṃ purāṇo na hanyate hanyamāne śarīre",
        hindi:
          "यह आत्मा न कभी जन्म लेती है न मरती है। यह अजन्मा, नित्य, शाश्वत और पुरातन है। शरीर के मारे जाने पर भी यह नहीं मारी जाती।",
        english:
          "The soul is never born nor dies at any time. It is unborn, eternal, ever-existing and primeval. It is not slain when the body is slain.",
        wordMeaning:
          "na=never; jāyate=born; mriyate=dies; nityaḥ=eternal; śāśvataḥ=everlasting; purāṇaḥ=ancient",
      },
      {
        chapter: 2,
        verse: 22,
        sanskrit:
          "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि |\nतथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही ॥",
        transliteration:
          "vāsāṃsi jīrṇāni yathā vihāya navāni gṛhṇāti naro 'parāṇi |\ntathā śarīrāṇi vihāya jīrṇāny anyāni saṃyāti navāni dehī",
        hindi:
          "जैसे मनुष्य पुराने वस्त्र त्यागकर नए वस्त्र ग्रहण करता है, वैसे ही आत्मा पुराने शरीरों को त्यागकर नए शरीर ग्रहण करती है।",
        english:
          "Just as a person puts on new garments giving up old worn-out ones, the soul similarly accepts new material bodies, giving up the old and useless ones.",
      },
      {
        chapter: 2,
        verse: 47,
        sanskrit:
          "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
        transliteration:
          "karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
        hindi:
          "कर्म करना तेरा अधिकार है, फल में कभी नहीं। इसलिए न तू फल का कारण बन और न अकर्म में तेरी आसक्ति हो।",
        english:
          "You have a right to perform your prescribed duties, but you are never entitled to the fruits of those actions. Never consider yourself the cause of the results, and never be attached to inaction.",
        wordMeaning:
          "karmaṇi=in action; adhikāraḥ=right; te=your; mā=never; phaleṣu=in fruits; karma-phala=fruits of action; saṅgaḥ=attachment; akarmaṇi=in inaction",
      },
      {
        chapter: 2,
        verse: 48,
        sanskrit:
          "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय |\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥",
        transliteration:
          "yoga-sthaḥ kuru karmāṇi saṅgaṃ tyaktvā dhanañjaya |\nsiddhyasiddhyoḥ samo bhūtvā samatvaṃ yoga ucyate",
        hindi:
          "हे धनंजय! योग में स्थित होकर कर्म कर, आसक्ति छोड़ दे। सफलता और असफलता में समान रह — इस समभाव को ही योग कहते हैं।",
        english:
          "Perform your duties established in yoga, giving up all attachment. Be equal in success and failure — such equanimity is called yoga.",
      },
      {
        chapter: 2,
        verse: 55,
        sanskrit:
          "प्रजहाति यदा कामान्सर्वान्पार्थ मनोगतान् |\nआत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते ॥",
        transliteration:
          "prajahāti yadā kāmān sarvān pārtha manogatān |\nātmany evātmanā tuṣṭaḥ sthitaprajñas tadocyate",
        hindi:
          "हे पार्थ! जब पुरुष मन की सभी कामनाओं को त्याग देता है और आत्मा में ही संतुष्ट रहता है, तब उसे स्थितप्रज्ञ कहते हैं।",
        english:
          "When a person abandons all desires that enter the mind, and is satisfied in the self by the self alone, they are called a person of steady wisdom.",
      },
    ],
  },
  {
    id: 3,
    title: "Karma Yoga",
    titleHi: "कर्म योग",
    titleSanskrit: "कर्मयोग",
    verseCount: 43,
    summary:
      "Krishna explains the path of selfless action. He teaches that action cannot be avoided, but it can be performed without attachment to results. Performing one's duty for the good of the world (Yajna) is the highest karma.",
    summaryHi:
      "कृष्ण निष्काम कर्म के मार्ग की व्याख्या करते हैं। कर्म से बचा नहीं जा सकता, लेकिन फल की आसक्ति के बिना कर्म किया जा सकता है। लोक-कल्याण के लिए किया गया कर्म (यज्ञ) ही श्रेष्ठ कर्म है।",
    keyTeachings: [
      "Action is unavoidable — even the wise must act for the world's welfare",
      "Lead by example: what the great do, others follow (3.21)",
      "Performing your dharma (role) is better than imitating another's dharma",
      "Lust and anger are the greatest enemies of the soul",
      "Sacrifice (yajna) maintains the cosmic order — give and receive freely",
    ],
    famousVerses: [8, 21, 35],
    whyMattersToday:
      "In a culture obsessed with personal branding, Karma Yoga reminds us that our actions ripple outward. Leaders especially bear the burden of setting examples — verse 3.21 is a timeless truth about influence. The recognition of lust and anger as enemies helps modern psychology understand impulse control.",
    faq: [
      {
        q: "What is Karma Yoga?",
        a: "It is the path of selfless action performed as a duty, without attachment to results or ego. Work becomes worship when done with this spirit.",
      },
      {
        q: "Why does Krishna say not to renounce action?",
        a: "Because even the renounced perform actions — breathing, thinking, living. The goal is to purify the quality of action, not to stop it.",
      },
      {
        q: "What does 'yajna' mean in this context?",
        a: "Yajna originally means fire sacrifice, but in the Gita it symbolises any action done as an offering to the greater good — professional work, family care, community service.",
      },
      {
        q: "How do I overcome lust and anger?",
        a: "Krishna says to know them as the enemy, regulate the senses, steady the mind, and ultimately rest in the higher self which transcends these impulses.",
      },
    ],
    verses: [
      {
        chapter: 3,
        verse: 5,
        sanskrit:
          "न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत् |\nकार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः ॥",
        transliteration:
          "na hi kaścit kṣaṇam api jātu tiṣṭhaty akarma-kṛt |\nkāryate hy avaśaḥ karma sarvaḥ prakṛtijair guṇaiḥ",
        hindi:
          "कोई भी व्यक्ति क्षणभर भी बिना कर्म किए नहीं रह सकता। प्रकृति के गुणों से परवश होकर सभी को कर्म करना पड़ता है।",
        english:
          "No one can remain without action even for a moment; everyone is driven to action helplessly by the qualities born of material nature.",
      },
      {
        chapter: 3,
        verse: 8,
        sanskrit:
          "नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः |\nशरीरयात्रापि च ते न प्रसिद्ध्येदकर्मणः ॥",
        transliteration:
          "niyataṃ kuru karma tvaṃ karma jyāyo hy akarmaṇaḥ |\nśarīra-yātrāpi ca te na prasiddhyed akarmaṇaḥ",
        hindi:
          "तू अपने नियत कर्म कर — कर्म न करने से कर्म श्रेष्ठ है। कर्म न करने पर तेरी शरीर-यात्रा भी नहीं चलेगी।",
        english:
          "Perform your prescribed duty, for action is better than inaction. Even the maintenance of your physical body would not be possible without action.",
      },
      {
        chapter: 3,
        verse: 21,
        sanskrit: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः |\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते ॥",
        transliteration:
          "yad yad ācarati śreṣṭhas tat tad evetaro janaḥ |\nsa yat pramāṇaṃ kurute lokas tad anuvartate",
        hindi:
          "श्रेष्ठ पुरुष जो-जो आचरण करता है, साधारण मनुष्य भी वैसा ही करते हैं। वह जो मानक स्थापित करता है, जगत् उसका अनुसरण करता है।",
        english:
          "Whatever a great person does, common people follow. Whatever standards they set, the world follows.",
      },
      {
        chapter: 3,
        verse: 35,
        sanskrit:
          "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् |\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥",
        transliteration:
          "śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt |\nsva-dharme nidhanaṃ śreyaḥ para-dharmo bhayāvahaḥ",
        hindi:
          "अपना धर्म चाहे गुणहीन हो, पर-धर्म से उत्तम है। अपने धर्म में मरना भी श्रेयस्कर है — परधर्म भयावह है।",
        english:
          "One's own dharma, though imperfectly performed, is better than another's dharma well performed. Death in one's own dharma is better — another's dharma is dangerous.",
      },
      {
        chapter: 3,
        verse: 37,
        sanskrit:
          "काम एष क्रोध एष रजोगुणसमुद्भवः |\nमहाशनो महापाप्मा विद्ध्येनमिह वैरिणम् ॥",
        transliteration:
          "kāma eṣa krodha eṣa rajo-guṇa-samudbhavaḥ |\nmahāśano mahāpāpmā viddhy enam iha vairiṇam",
        hindi:
          "यह काम (वासना) और क्रोध — रजोगुण से उत्पन्न, बहुत खाने वाला और महापापी — इसे इस लोक में शत्रु जान।",
        english:
          "It is lust, it is anger, born of the mode of passion — all-devouring and most sinful. Know this to be the enemy here.",
      },
    ],
  },
  {
    id: 4,
    title: "Jnana Karma Sanyasa Yoga",
    titleHi: "ज्ञान कर्म संन्यास योग",
    titleSanskrit: "ज्ञानकर्मसंन्यासयोग",
    verseCount: 42,
    summary:
      "Krishna reveals the mystery of the avatar — that He descends whenever dharma declines. He teaches that all actions are purified by the fire of knowledge, and that knowledge alone liberates the soul from the bondage of karma.",
    summaryHi:
      "कृष्ण अवतार का रहस्य प्रकट करते हैं — जब-जब धर्म की हानि होती है, वे अवतरित होते हैं। वे सिखाते हैं कि सभी कर्म ज्ञान की अग्नि में शुद्ध हो जाते हैं और ज्ञान ही आत्मा को कर्म के बंधन से मुक्त करता है।",
    keyTeachings: [
      "God descends whenever righteousness declines (4.7-8)",
      "All actions are offered into the fire of divine knowledge",
      "The wise see inaction in action and action in inaction",
      "Knowledge is the purifier of all karma",
      "Approach a wise teacher with humility and learn the truth",
    ],
    famousVerses: [7, 8, 38],
    whyMattersToday:
      "The avatar concept gives comfort that divine help is always available in times of crisis. The teaching that knowledge purifies action resonates with modern education and self-awareness movements. Verse 4.34 on learning from a wise teacher remains the foundation of the guru-disciple tradition.",
    faq: [
      {
        q: "What is the avatar concept?",
        a: "Krishna teaches that God takes human form whenever evil overwhelms good and dharma declines. This is not limited to Hindu mythology — it represents the divine impulse toward restoration of balance.",
      },
      {
        q: "How does knowledge burn karma?",
        a: "When we act from ignorance and ego, karma accumulates. When actions are performed from the clarity of self-knowledge, there is no doer — hence no karma is created.",
      },
      {
        q: "Who was the original teacher of the Gita's wisdom?",
        a: "Krishna says He first taught this eternal science to the sun-god Vivasvat, then it passed down through generations, but was lost over time.",
      },
      {
        q: "What is the meaning of 'see inaction in action'?",
        a: "The wise act without the ego of being a doer. Their body may be active but their inner self remains still. Conversely, even sitting still, the untrained mind is in constant agitation — hence 'action in inaction'.",
      },
    ],
    verses: [
      {
        chapter: 4,
        verse: 7,
        sanskrit:
          "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत |\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥",
        transliteration:
          "yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṃ sṛjāmy aham",
        hindi:
          "हे भारत! जब-जब धर्म की हानि होती है और अधर्म की वृद्धि होती है, तब-तब मैं अपने आप को प्रकट करता हूँ।",
        english:
          "Whenever there is a decline in righteousness and a rise in unrighteousness, O Bharata, at that time I manifest Myself.",
        wordMeaning:
          "yadā=whenever; dharmasya=of righteousness; glāniḥ=decline; abhyutthānam=rise; adharmasya=of unrighteousness",
      },
      {
        chapter: 4,
        verse: 8,
        sanskrit:
          "परित्राणाय साधूनां विनाशाय च दुष्कृताम् |\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥",
        transliteration:
          "paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām |\ndharma-saṃsthāpanārthāya sambhavāmi yuge yuge",
        hindi:
          "साधुओं की रक्षा के लिए, दुष्टों के विनाश के लिए और धर्म की स्थापना के लिए मैं युग-युग में जन्म लेता हूँ।",
        english:
          "To deliver the righteous, to destroy the wicked, and to reestablish dharma, I advent Myself millennium after millennium.",
      },
      {
        chapter: 4,
        verse: 34,
        sanskrit:
          "तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया |\nउपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः ॥",
        transliteration:
          "tad viddhi praṇipātena paripraśnena sevayā |\nupadekṣyanti te jñānaṃ jñāninas tattva-darśinaḥ",
        hindi:
          "उसे प्रणाम करके, प्रश्न पूछकर और सेवा करके जान। तत्त्वदर्शी ज्ञानी लोग तुझे ज्ञान का उपदेश देंगे।",
        english:
          "Learn the truth by approaching a spiritual master. Inquire from them submissively and render service. The self-realised can impart knowledge to you.",
      },
      {
        chapter: 4,
        verse: 38,
        sanskrit:
          "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते |\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति ॥",
        transliteration:
          "na hi jñānena sadṛśaṃ pavitram iha vidyate |\ntat svayaṃ yoga-saṃsiddhaḥ kālenātmani vindati",
        hindi:
          "इस जगत् में ज्ञान के समान पवित्र करने वाला और कुछ नहीं है। योग में पूर्ण सिद्ध हुआ पुरुष उसे समय पर अपने आप में पा लेता है।",
        english:
          "In this world, there is nothing as purifying as transcendental knowledge. One who is perfected in yoga finds this knowledge within in due time.",
      },
    ],
  },
  {
    id: 5,
    title: "Karma Sanyasa Yoga",
    titleHi: "कर्म संन्यास योग",
    titleSanskrit: "कर्मसंन्यासयोग",
    verseCount: 29,
    summary:
      "Krishna reconciles action (Karma Yoga) and renunciation (Sanyasa), showing that both lead to the same goal. The real renunciation is inner — giving up the ego of doership while continuing to act.",
    summaryHi:
      "कृष्ण कर्म योग और संन्यास में समन्वय स्थापित करते हैं और दिखाते हैं कि दोनों एक ही लक्ष्य तक पहुँचाते हैं। सच्चा संन्यास आंतरिक है — कर्तापन का अभिमान छोड़ देना, कर्म करते हुए भी।",
    keyTeachings: [
      "True renunciation is inner — giving up ego while continuing to act",
      "The self-disciplined person sees all beings as equal",
      "Eternal peace belongs to one free from desire and ego",
      "The senses, mind, and intellect can all be instruments of liberation",
    ],
    famousVerses: [10, 18, 29],
    whyMattersToday:
      "The reconciliation of action and renunciation is deeply relevant for modern life. We need not retreat to forests to be spiritual — we can act fully in the world while remaining inwardly free. This chapter supports mindful engagement in professional life.",
    faq: [
      {
        q: "Why can't I just renounce and meditate?",
        a: "Without inner purification through action, mere physical renunciation doesn't help. Krishna says both paths lead to liberation, but Karma Yoga is easier for those who are not yet spiritually advanced.",
      },
      {
        q: "What does it mean to act without doership?",
        a: "It means completing tasks fully while attributing the results to the divine rather than to personal ego. You act as an instrument, not as the ultimate author of outcomes.",
      },
    ],
    verses: [
      {
        chapter: 5,
        verse: 10,
        sanskrit:
          "ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः |\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा ॥",
        transliteration:
          "brahmaṇy ādhāya karmāṇi saṅgaṃ tyaktvā karoti yaḥ |\nlipyate na sa pāpena padma-patram ivāmbhasā",
        hindi:
          "जो ब्रह्म को समर्पित करके और आसक्ति त्यागकर कर्म करता है, वह पाप से उसी तरह नहीं लिपता जैसे कमल का पत्ता जल से।",
        english:
          "One who performs actions offering them to Brahman and abandoning attachment is not tainted by sin, just as a lotus leaf is not wetted by water.",
      },
      {
        chapter: 5,
        verse: 18,
        sanskrit:
          "विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि |\nशुनि चैव श्वपाके च पण्डिताः समदर्शिनः ॥",
        transliteration:
          "vidyā-vinaya-sampanne brāhmaṇe gavi hastini |\nśuni caiva śva-pāke ca paṇḍitāḥ sama-darśinaḥ",
        hindi:
          "ज्ञानी और विनम्र ब्राह्मण, गाय, हाथी, कुत्ते और चांडाल — सबमें पंडित समान दृष्टि रखते हैं।",
        english:
          "The wise see with equal vision a learned brahmin, a cow, an elephant, a dog, and even the outcast.",
      },
      {
        chapter: 5,
        verse: 29,
        sanskrit:
          "भोक्तारं यज्ञतपसां सर्वलोकमहेश्वरम् |\nसुहृदं सर्वभूतानां ज्ञात्वा मां शान्तिमृच्छति ॥",
        transliteration:
          "bhoktāraṃ yajña-tapasāṃ sarva-loka-maheśvaram |\nsuhṛdaṃ sarva-bhūtānāṃ jñātvā māṃ śāntim ṛcchati",
        hindi:
          "मुझे यज्ञ और तप का भोक्ता, सम्पूर्ण लोकों का महेश्वर और सभी प्राणियों का परम मित्र जानकर मनुष्य शांति प्राप्त करता है।",
        english:
          "Knowing Me as the enjoyer of all sacrifices and penances, the Supreme Lord of all worlds, and the benefactor of all beings, one attains peace.",
      },
    ],
  },
  {
    id: 6,
    title: "Atma Samyama Yoga",
    titleHi: "आत्मसंयम योग",
    titleSanskrit: "आत्मसंयमयोग",
    verseCount: 47,
    summary:
      "Krishna teaches practical methods of dhyana (meditation) and self-control. He describes the ideal environment for meditation, the qualities of a true yogi, and explains what happens to those who fail in yoga practice.",
    summaryHi:
      "कृष्ण ध्यान (meditation) और आत्म-नियंत्रण के व्यावहारिक उपाय सिखाते हैं। वे ध्यान के लिए आदर्श वातावरण, सच्चे योगी के गुणों का वर्णन करते हैं और बताते हैं कि योग-अभ्यास में असफल होने पर क्या होता है।",
    keyTeachings: [
      "The mind is the greatest friend and greatest enemy of the self",
      "A yogi is moderate in eating, sleeping, recreation, and wakefulness",
      "Meditation: focus the mind on the self with single-pointed attention",
      "One who fails in yoga is reborn in a good family and continues the journey",
      "Among all yogis, the one who worships God with faith and love is the highest",
    ],
    famousVerses: [5, 6, 35],
    whyMattersToday:
      "In the age of distraction, Chapter 6 is the Gita's meditation manual. Its prescription of moderation in sleep, food, and recreation is remarkably aligned with modern wellness research. The teaching that even failed yogis continue their journey in the next life removes the pressure to achieve perfection immediately.",
    faq: [
      {
        q: "How do I begin meditation practice?",
        a: "Krishna recommends a clean, quiet place, a comfortable seat, and single-pointed focus on the divine. Start with 5-10 minutes daily. Consistency matters more than duration.",
      },
      {
        q: "Is meditation only for monks?",
        a: "No. The Gita describes a 'householder yogi' — one who lives fully in the world but maintains inner stillness through regular practice.",
      },
      {
        q: "What happens if I lose my meditation practice?",
        a: "Krishna reassures that no spiritual effort is ever lost. Even an incomplete practitioner is reborn with the spiritual progress intact, continuing from where they left off.",
      },
    ],
    verses: [
      {
        chapter: 6,
        verse: 5,
        sanskrit:
          "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् |\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥",
        transliteration:
          "uddhared ātmanātmānaṃ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
        hindi:
          "अपने द्वारा अपना उद्धार करे, अपने को अधोगति में न डाले। आत्मा ही आत्मा का मित्र है और आत्मा ही आत्मा का शत्रु है।",
        english:
          "Let a person lift themselves up by their own self; let them not degrade themselves. The self alone is the friend of the self, and the self alone is the enemy of the self.",
      },
      {
        chapter: 6,
        verse: 6,
        sanskrit:
          "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः |\nअनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत् ॥",
        transliteration:
          "bandhur ātmātmanas tasya yenātmaivātmanā jitaḥ |\nanātmanas tu śatrutve vartetātmaiva śatru-vat",
        hindi:
          "जिसने आत्मा द्वारा आत्मा को जीत लिया है, उसके लिए आत्मा मित्र है। परंतु जो आत्मा नहीं जीत सका, उसके लिए वही शत्रु जैसा है।",
        english:
          "For one who has conquered the mind, the self is a friend. But for one who has failed to do so, the self remains the enemy.",
      },
      {
        chapter: 6,
        verse: 34,
        sanskrit:
          "चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम् |\nतस्याहं निग्रहं मन्ये वायोरिव सुदुष्करम् ॥",
        transliteration:
          "cañcalaṃ hi manaḥ kṛṣṇa pramāthi balavad dṛḍham |\ntasyāhaṃ nigrahaṃ manye vāyor iva suduṣkaram",
        hindi:
          "हे कृष्ण! यह मन चंचल, उद्दंड, बलवान और दृढ़ है। मैं इसे वायु की तरह वश में करना अत्यंत कठिन मानता हूँ।",
        english:
          "The mind is restless, turbulent, obstinate and very strong, O Krishna. I consider it as difficult to control as the wind.",
      },
      {
        chapter: 6,
        verse: 35,
        sanskrit:
          "असंशयं महाबाहो मनो दुर्निग्रहं चलम् |\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥",
        transliteration:
          "asaṃśayaṃ mahābāho mano durnigrahaṃ calam |\nabhyāsena tu kaunteya vairāgyeṇa ca gṛhyate",
        hindi:
          "हे महाबाहो! निःसंदेह मन चंचल और कठिनता से वश में होने वाला है; परंतु हे कौंतेय! अभ्यास और वैराग्य से इसे वश में किया जा सकता है।",
        english:
          "O mighty-armed, undoubtedly the mind is difficult to control and restless. But by practice and by detachment, O son of Kunti, it can be controlled.",
      },
    ],
  },
  {
    id: 7,
    title: "Jnana Vijnana Yoga",
    titleHi: "ज्ञान विज्ञान योग",
    titleSanskrit: "ज्ञानविज्ञानयोग",
    verseCount: 30,
    summary:
      "Krishna reveals the nature of the Absolute — His para and apara nature, the eight-fold material nature, and how the divine maya veils the truth. He describes four types of people who seek Him and four types who do not.",
    summaryHi:
      "कृष्ण परम सत्य की प्रकृति प्रकट करते हैं — उनकी परा और अपरा प्रकृति, आठ-गुणी भौतिक प्रकृति, और दिव्य माया सत्य को कैसे ढकती है। वे बताते हैं कि चार प्रकार के लोग उन्हें खोजते हैं।",
    keyTeachings: [
      "God has two natures: lower material (eight elements) and higher spiritual (life force)",
      "Divine maya is My own power — very hard to cross",
      "Four types seek God: distressed, curious, desire-driven, and wisdom-seekers",
      "Those devoted to other gods are also worshipping Me indirectly",
      "Few truly know Me in My fullness",
    ],
    famousVerses: [14, 19, 28],
    whyMattersToday:
      "The concept of maya as divine illusion parallels modern psychology's understanding of cognitive biases. The four types of devotees provide a framework for understanding different motivations for spirituality. The inclusive statement that worship of any deity ultimately reaches God promotes spiritual unity.",
    faq: [
      {
        q: "What is maya?",
        a: "Maya is the divine power of illusion that makes the temporary appear permanent and the unreal appear real. It is not evil — it is the mechanism through which creation unfolds, but it obscures our true nature.",
      },
      {
        q: "Who is the highest type of devotee?",
        a: "The jnani — the wisdom-seeker who loves God for God's own sake, not for any personal gain. Krishna says such a devotee is most dear to Him.",
      },
    ],
    verses: [
      {
        chapter: 7,
        verse: 14,
        sanskrit:
          "दैवी ह्येषा गुणमयी मम माया दुरत्यया |\nमामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते ॥",
        transliteration:
          "daivī hy eṣā guṇamayī mama māyā duratyayā |\nmām eva ye prapadyante māyām etāṃ taranti te",
        hindi:
          "यह मेरी दिव्य गुणमयी माया अत्यंत दुस्तर है। जो मुझे ही शरण लेते हैं, वे इस माया को पार कर जाते हैं।",
        english:
          "This divine energy of Mine consisting of the three modes of material nature is difficult to overcome. But those who have surrendered to Me can easily cross beyond it.",
      },
      {
        chapter: 7,
        verse: 19,
        sanskrit:
          "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते |\nवासुदेवः सर्वमिति स महात्मा सुदुर्लभः ॥",
        transliteration:
          "bahūnāṃ janmanām ante jñānavān māṃ prapadyate |\nvāsudevaḥ sarvam iti sa mahātmā sudurlabhaḥ",
        hindi:
          "अनेक जन्मों के अंत में ज्ञानवान पुरुष 'वासुदेव ही सब कुछ है' ऐसा जानकर मुझे प्राप्त होता है। ऐसा महात्मा अत्यंत दुर्लभ है।",
        english:
          "After many births of seeking, the wise person who knows that Vasudeva is everything surrenders to Me. Such a great soul is very rare.",
      },
      {
        chapter: 7,
        verse: 7,
        sanskrit:
          "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय |\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव ॥",
        transliteration:
          "mattaḥ parataraṃ nānyat kiñcid asti dhanañjaya |\nmayi sarvam idaṃ protaṃ sūtre maṇi-gaṇā iva",
        hindi:
          "हे धनंजय! मुझसे परे कुछ भी नहीं है। यह सम्पूर्ण जगत् मुझ में उसी तरह पिरोया है जैसे मणियाँ धागे में।",
        english:
          "O Dhananjaya, there is nothing higher than Me. Everything rests in Me, as pearls are strung on a thread.",
      },
    ],
  },
  {
    id: 8,
    title: "Aksara Brahma Yoga",
    titleHi: "अक्षर ब्रह्म योग",
    titleSanskrit: "अक्षरब्रह्मयोग",
    verseCount: 28,
    summary:
      "Arjuna asks about Brahman, the self, karma, and the nature of death. Krishna explains what a person thinks at the moment of death determines their next birth, and reveals the paths of light and darkness after death.",
    summaryHi:
      "अर्जुन ब्रह्म, आत्मा, कर्म और मृत्यु की प्रकृति के बारे में पूछता है। कृष्ण बताते हैं कि मृत्यु के क्षण में मन जहाँ होता है, वही अगला जन्म तय करता है और मृत्यु के बाद की दो राहों का वर्णन करते हैं।",
    keyTeachings: [
      "Whatever one thinks at the moment of death, that one becomes",
      "Those who remember Me at the last moment come to Me",
      "The syllable Om is the eternal Brahman",
      "Two paths after death: the path of light and the path of darkness",
      "The yogi who remembers Me constantly crosses beyond all these paths",
    ],
    famousVerses: [5, 6, 7],
    whyMattersToday:
      "The teaching about the moment of death underscores the importance of mental habits formed through daily practice. What the mind thinks at the end reflects what it has cultivated throughout life. This is validated by modern palliative care research showing the dying often reflect on their deepest values.",
    faq: [
      {
        q: "What is Aksara Brahman?",
        a: "Aksara means imperishable. Brahman is the ultimate reality. This chapter teaches about the imperishable ground of all existence — beyond the perishable and even beyond the cosmic soul.",
      },
      {
        q: "How can I ensure I think of God at death?",
        a: "By constant practice (abhyasa) throughout life. The dying mind reflects what was repeatedly cultivated. Daily meditation, prayer, and God-remembrance build the habit naturally.",
      },
    ],
    verses: [
      {
        chapter: 8,
        verse: 5,
        sanskrit:
          "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम् |\nयः प्रयाति स मद्भावं याति नास्त्यत्र संशयः ॥",
        transliteration:
          "anta-kāle ca mām eva smaran muktvā kalevaram |\nyaḥ prayāti sa mad-bhāvaṃ yāti nāsty atra saṃśayaḥ",
        hindi:
          "जो अंत काल में मुझे ही स्मरण करते हुए शरीर छोड़ता है, वह मेरे भाव को प्राप्त होता है — इसमें कोई संशय नहीं।",
        english:
          "Whoever, at the end of life, gives up the body remembering Me alone, reaches My state. Of this there is no doubt.",
      },
      {
        chapter: 8,
        verse: 6,
        sanskrit:
          "यं यं वापि स्मरन्भावं त्यजत्यन्ते कलेवरम् |\nतं तमेवैति कौन्तेय सदा तद्भावभावितः ॥",
        transliteration:
          "yaṃ yaṃ vāpi smaran bhāvaṃ tyajaty ante kalevaram |\ntaṃ tam evaiti kaunteya sadā tad-bhāva-bhāvitaḥ",
        hindi:
          "हे कौंतेय! मनुष्य अंत में जिस-जिस भाव का स्मरण करते हुए शरीर छोड़ता है, उसी-उसी भाव से सदा भावित होने के कारण वह उसी को प्राप्त होता है।",
        english:
          "O son of Kunti, whatever state of being one remembers when they give up the body, that state one always attains, being absorbed in that state of being.",
      },
      {
        chapter: 8,
        verse: 13,
        sanskrit:
          "ओमित्येकाक्षरं ब्रह्म व्याहरन्मामनुस्मरन् |\nयः प्रयाति त्यजन्देहं स याति परमां गतिम् ॥",
        transliteration:
          "om ity ekākṣaraṃ brahma vyāharan mām anusmaran |\nyaḥ prayāti tyajan dehaṃ sa yāti paramāṃ gatim",
        hindi:
          "जो 'ओम्' एकाक्षर ब्रह्म का उच्चारण करते हुए और मुझे स्मरण करते हुए शरीर त्यागता है, वह परम गति को प्राप्त होता है।",
        english:
          "Uttering Om — the single-syllable Brahman — and remembering Me, whoever departs from the body reaches the supreme goal.",
      },
    ],
  },
  {
    id: 9,
    title: "Raja Vidya Yoga",
    titleHi: "राजविद्या योग",
    titleSanskrit: "राजविद्याराजगुह्ययोग",
    verseCount: 34,
    summary:
      "Called the 'king of all knowledge and king of secrets,' this chapter presents the most direct and intimate path to God. Krishna promises to personally carry what His devotees need and preserve what they have, if they worship Him with exclusive devotion.",
    summaryHi:
      "'सभी ज्ञानों का राजा और सभी रहस्यों का राजा' कहे जाने वाले इस अध्याय में ईश्वर तक का सबसे प्रत्यक्ष और आत्मीय मार्ग प्रस्तुत है। कृष्ण वचन देते हैं कि जो उनकी एकनिष्ठ भक्ति करते हैं, वे स्वयं उनकी आवश्यकताएं पूरी करेंगे।",
    keyTeachings: [
      "Those who worship Me with unwavering devotion — I personally carry what they lack and preserve what they have (9.22)",
      "Even the worst sinner can cross all evil on the boat of knowledge",
      "Offer Me a leaf, a flower, fruit, or water with devotion — I accept it",
      "Whatever you do, eat, offer — offer it all to Me",
      "God pervades the universe yet is beyond it",
    ],
    famousVerses: [22, 26, 27],
    whyMattersToday:
      "Verse 9.26 — 'offer Me a leaf, a flower, fruit, or water with love' — democratises devotion. It requires no expensive ritual, no priestly mediation, only sincere love. This is the heart of the Bhakti movement and remains deeply relevant in every era.",
    faq: [
      {
        q: "What is Raja Vidya?",
        a: "'Royal knowledge' — the Gita calls this chapter's teaching the most sacred and purifying of all sciences, because it connects the individual soul directly with God through devotion.",
      },
      {
        q: "Does God really carry our burdens?",
        a: "9.22 promises that those who are devoted exclusively to God are personally cared for by the divine. This reflects the principle that surrender and trust attract divine support.",
      },
    ],
    verses: [
      {
        chapter: 9,
        verse: 22,
        sanskrit:
          "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते |\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥",
        transliteration:
          "ananyāś cintayanto māṃ ye janāḥ paryupāsate |\nteṣāṃ nityābhiyuktānāṃ yoga-kṣemaṃ vahāmy aham",
        hindi:
          "जो अनन्य भाव से मेरा ध्यान करते हुए मेरी उपासना करते हैं, उन नित्य-योगियों का योग-क्षेम मैं स्वयं वहन करता हूँ।",
        english:
          "For those who worship Me with exclusive devotion, who are always absorbed in thought of Me, I personally carry what they lack and preserve what they have.",
        wordMeaning:
          "ananyāḥ=exclusive; yoga=what they need; kṣemam=what they have; vahāmi=I carry",
      },
      {
        chapter: 9,
        verse: 26,
        sanskrit:
          "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति |\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥",
        transliteration:
          "patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati |\ntad ahaṃ bhakty-upahṛtam aśnāmi prayatātmanaḥ",
        hindi:
          "जो मुझे पत्र, पुष्प, फल या जल भक्ति से अर्पण करता है, मैं उस शुद्ध हृदय वाले की भक्ति से अर्पित उस चीज को स्वीकार करता हूँ।",
        english:
          "If one offers Me with devotion a leaf, a flower, fruit, or water, I accept that offering of love from the pure-hearted.",
      },
      {
        chapter: 9,
        verse: 27,
        sanskrit:
          "यत्करोषि यदश्नासि यज्जुहोषि ददासि यत् |\nयत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम् ॥",
        transliteration:
          "yat karoṣi yad aśnāsi yaj juhoṣi dadāsi yat |\nyat tapasyasi kaunteya tat kuruṣva mad-arpaṇam",
        hindi:
          "हे कौंतेय! तू जो कुछ करता है, खाता है, हवन करता है, देता है और जो तप करता है — वह सब मुझे समर्पित कर दे।",
        english:
          "O son of Kunti, whatever you do, whatever you eat, whatever you offer in sacrifice, whatever you give away, whatever penances you perform — do that as an offering to Me.",
      },
    ],
  },
  {
    id: 10,
    title: "Vibhuti Yoga",
    titleHi: "विभूति योग",
    titleSanskrit: "विभूतियोग",
    verseCount: 42,
    summary:
      "Krishna describes His divine manifestations (vibhutis) in the world. He is the best of every category — the Himalaya among mountains, fire among purifiers, the lion among animals, the Ganga among rivers.",
    summaryHi:
      "कृष्ण जगत् में अपनी दिव्य विभूतियों का वर्णन करते हैं। वे प्रत्येक श्रेणी में श्रेष्ठ हैं — पर्वतों में हिमालय, शुद्धि करने वालों में अग्नि, पशुओं में सिंह, नदियों में गंगा।",
    keyTeachings: [
      "Wherever excellence exists, know it as a spark of divine splendour",
      "God is the source of all creation — nothing exists without Me",
      "Even knowing a fraction of My glory suffices for devotion",
      "I am the beginning, middle, and end of all beings",
    ],
    famousVerses: [20, 39, 41],
    whyMattersToday:
      "This chapter teaches us to see divinity in excellence. When we encounter a great artist, a noble leader, a breathtaking landscape, we are encountering a vibhuti — a divine manifestation. This transforms everyday encounters into sacred experiences.",
    faq: [
      {
        q: "What is a vibhuti?",
        a: "A vibhuti is a divine manifestation or special power. Krishna lists examples from nature, society, and the cosmos to help Arjuna recognise the divine everywhere.",
      },
    ],
    verses: [
      {
        chapter: 10,
        verse: 20,
        sanskrit:
          "अहमात्मा गुडाकेश सर्वभूताशयस्थितः |\nअहमादिश्च मध्यं च भूतानामन्त एव च ॥",
        transliteration:
          "aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ |\naham ādiś ca madhyaṃ ca bhūtānām anta eva ca",
        hindi:
          "हे गुडाकेश! मैं सभी प्राणियों के हृदय में स्थित आत्मा हूँ। मैं ही सभी प्राणियों का आदि, मध्य और अंत हूँ।",
        english:
          "I am the Self, O Gudakesha, seated in the hearts of all creatures. I am the beginning, the middle, and the end of all beings.",
      },
      {
        chapter: 10,
        verse: 39,
        sanskrit:
          "यच्चापि सर्वभूतानां बीजं तदहमर्जुन |\nन तदस्ति विना यत्स्यान्मया भूतं चराचरम् ॥",
        transliteration:
          "yac cāpi sarva-bhūtānāṃ bījaṃ tad aham arjuna |\nna tad asti vinā yat syān mayā bhūtaṃ carācaram",
        hindi:
          "हे अर्जुन! जो सभी प्राणियों का बीज है, वह भी मैं ही हूँ। ऐसा कोई चर-अचर प्राणी नहीं जो मेरे बिना हो।",
        english:
          "I am also the seed of all beings, O Arjuna. There is no being, moving or unmoving, that exists without Me.",
      },
      {
        chapter: 10,
        verse: 41,
        sanskrit:
          "यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा |\nतत्तदेवावगच्छ त्वं मम तेजोंशसम्भवम् ॥",
        transliteration:
          "yad yad vibhūtimat sattvaṃ śrīmad ūrjitam eva vā |\ntat tad evāvagaccha tvaṃ mama tejo-'ṃśa-sambhavam",
        hindi:
          "जो कुछ भी विभूतिशाली, कान्तिशाली या शक्तिशाली सत्त्व है — उसे तू मेरे तेज के अंश से उत्पन्न जान।",
        english:
          "Know that whatever is glorious, beautiful, and powerful — all that is but a spark of My splendour.",
      },
    ],
  },
  {
    id: 11,
    title: "Vishwarupa Darshana Yoga",
    titleHi: "विश्वरूप दर्शन योग",
    titleSanskrit: "विश्वरूपदर्शनयोग",
    verseCount: 55,
    summary:
      "At Arjuna's request, Krishna grants him divine vision and reveals His cosmic form — a terrifying, magnificent universal manifestation. Arjuna is overwhelmed and begs Krishna to return to His gentle human form.",
    summaryHi:
      "अर्जुन के अनुरोध पर कृष्ण उसे दिव्य दृष्टि देते हैं और अपना विश्वरूप दिखाते हैं — एक भयंकर, भव्य ब्रह्मांडीय प्रकटन। अर्जुन अभिभूत होकर कृष्ण से अपने सौम्य मानवीय रूप में वापस आने की प्रार्थना करता है।",
    keyTeachings: [
      "God's true form is beyond human comprehension — the cosmos is His body",
      "Arise Arjuna, be victorious — I have already vanquished all enemies (11.33)",
      "This cosmic vision cannot be seen without divine grace",
      "Devotion, not rituals or penances, is the path to see God's true form",
    ],
    famousVerses: [33, 54, 55],
    whyMattersToday:
      "The Vishwarupa reminds us of the incomprehensible vastness of existence. When we feel small or overwhelmed, it helps to know that we are part of an infinite divine order. Verse 11.33 — 'Arise, be victorious' — has inspired leaders and warriors across ages.",
    faq: [
      {
        q: "What did Arjuna see in the cosmic form?",
        a: "He saw all the gods, all of creation, countless worlds, the sun and moon as God's eyes, fire as the mouth — an infinite, terrifying, all-containing vision of the divine.",
      },
    ],
    verses: [
      {
        chapter: 11,
        verse: 12,
        sanskrit:
          "दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता |\nयदि भाः सदृशी सा स्याद्भासस्तस्य महात्मनः ॥",
        transliteration:
          "divi sūrya-sahasrasya bhaved yugapad utthitā |\nyadi bhāḥ sadṛśī sā syād bhāsas tasya mahātmanaḥ",
        hindi:
          "यदि एक साथ आकाश में हज़ार सूर्य उग आएं, तो भी उस महात्मा के प्रकाश के समान नहीं होंगे।",
        english:
          "If a thousand suns were to rise at once in the sky, their combined radiance might resemble the splendour of that great Being.",
      },
      {
        chapter: 11,
        verse: 33,
        sanskrit:
          "तस्मात्त्वमुत्तिष्ठ यशो लभस्व जित्वा शत्रून्भुङ्क्ष्व राज्यं समृद्धम् |\nमयैवैते निहताः पूर्वमेव निमित्तमात्रं भव सव्यसाचिन् ॥",
        transliteration:
          "tasmāt tvam uttiṣṭha yaśo labhasva jitvā śatrūn bhuṅkṣva rājyaṃ samṛddham |\nmayaivaitē nihatāḥ pūrvam eva nimitta-mātraṃ bhava savya-sācin",
        hindi:
          "इसलिए तू उठ, यश प्राप्त कर, शत्रुओं को जीतकर समृद्ध राज्य भोग। ये सब पहले से ही मेरे द्वारा मारे जा चुके हैं — तू केवल निमित्त बन।",
        english:
          "Therefore arise, win glory, conquer your enemies and enjoy a prosperous kingdom. These warriors have already been slain by Me. Be merely My instrument, O Savyasachin.",
      },
      {
        chapter: 11,
        verse: 54,
        sanskrit:
          "भक्त्या त्वनन्यया शक्य अहमेवंविधोऽर्जुन |\nज्ञातुं द्रष्टुं च तत्त्वेन प्रवेष्टुं च परन्तप ॥",
        transliteration:
          "bhaktyā tv ananyayā śakya aham evaṃ-vidho 'rjuna |\njñātuṃ draṣṭuṃ ca tattvena praveṣṭuṃ ca parantapa",
        hindi:
          "हे परंतप अर्जुन! अनन्य भक्ति से ही मुझे इस रूप में तत्त्व से जाना, देखा और मुझमें प्रवेश किया जा सकता है।",
        english:
          "Only by exclusive devotion can I be known, seen in truth, and entered into, O Arjuna.",
      },
    ],
  },
  {
    id: 12,
    title: "Bhakti Yoga",
    titleHi: "भक्ति योग",
    titleSanskrit: "भक्तियोग",
    verseCount: 20,
    summary:
      "The shortest and most beloved chapter, Krishna describes the qualities of His dear devotee — compassionate, content, free from hatred and ego. He declares devotion to the personal God to be easier than worship of the formless Absolute.",
    summaryHi:
      "सबसे छोटा और प्रिय अध्याय — कृष्ण अपने प्रिय भक्त के गुणों का वर्णन करते हैं: करुणामय, संतुष्ट, द्वेष और अहंकार से मुक्त। वे घोषणा करते हैं कि व्यक्तिगत ईश्वर की भक्ति निराकार ब्रह्म की उपासना से सरल है।",
    keyTeachings: [
      "Devotion to the personal form of God is easier than the formless path",
      "The beloved devotee is compassionate, without pride, patient and content",
      "One who neither causes nor is disturbed by fear is dear to Me",
      "One equal to friend and foe, equal in honour and dishonour is dear to Me",
    ],
    famousVerses: [13, 14, 15],
    whyMattersToday:
      "The qualities described in this chapter — compassion, equanimity, freedom from ego — are what contemporary spiritual seekers and mental health practitioners strive for. Chapter 12 is a concise character sketch of the ideal human being.",
    faq: [
      {
        q: "What is Bhakti Yoga?",
        a: "The path of devotion — loving God with total surrender. Unlike Jnana (knowledge) or Karma (action), Bhakti's only requirement is sincere love. Anyone can practice it regardless of education, status, or age.",
      },
    ],
    verses: [
      {
        chapter: 12,
        verse: 13,
        sanskrit:
          "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च |\nनिर्ममो निरहंकारः समदुःखसुखः क्षमी ॥",
        transliteration:
          "adveṣṭā sarva-bhūtānāṃ maitraḥ karuṇa eva ca |\nnirmamo nirahaṃkāraḥ sama-duḥkha-sukhaḥ kṣamī",
        hindi:
          "जो सभी प्राणियों से द्वेष नहीं करता, सबका मित्र और करुणामय है, ममता और अहंकार से रहित है, सुख-दुःख में सम है और क्षमाशील है —",
        english:
          "One who has no hatred for any creature, who is friendly and compassionate, free from 'mine-ness' and ego, equal in pain and pleasure, forgiving —",
      },
      {
        chapter: 12,
        verse: 14,
        sanskrit:
          "सन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः |\nमय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः ॥",
        transliteration:
          "santuṣṭaḥ satataṃ yogī yatātmā dṛḍha-niścayaḥ |\nmayy arpita-mano-buddhir yo mad-bhaktaḥ sa me priyaḥ",
        hindi:
          "सदा संतुष्ट, आत्म-संयमी, दृढ़निश्चयी योगी जिसने मुझमें मन और बुद्धि अर्पित कर दी है — वह मेरा भक्त मुझे प्रिय है।",
        english:
          "Always content, self-controlled, of firm resolve, with mind and intellect surrendered to Me — such a devotee is dear to Me.",
      },
    ],
  },
  {
    id: 13,
    title: "Kshetra Kshetrajna Vibhaga Yoga",
    titleHi: "क्षेत्र क्षेत्रज्ञ विभाग योग",
    titleSanskrit: "क्षेत्रक्षेत्रज्ञविभागयोग",
    verseCount: 34,
    summary:
      "Krishna distinguishes the body (kshetra/field) from the knower of the body (kshetrajna). The ultimate knower of all fields is God Himself. Understanding this distinction leads to liberation.",
    summaryHi:
      "कृष्ण शरीर (क्षेत्र) और शरीर के ज्ञाता (क्षेत्रज्ञ) में अंतर स्पष्ट करते हैं। सभी क्षेत्रों का परम ज्ञाता स्वयं ईश्वर है। इस भेद को समझना मुक्ति की ओर ले जाता है।",
    keyTeachings: [
      "The body is the field; the soul within is the knower of the field",
      "God is the ultimate knower of all fields",
      "The twenty qualities of the wise include humility, non-violence, and equanimity",
      "Knowledge, the knowable, and the object of knowledge — understanding these leads to liberation",
    ],
    famousVerses: [1, 2, 27],
    whyMattersToday:
      "The kshetra-kshetrajna framework is an elegant model for self-awareness. Recognising yourself as the observer, not just the body or thoughts, is the foundation of mindfulness practice. This chapter anticipates modern cognitive science's distinction between the thinking mind and meta-awareness.",
    faq: [
      {
        q: "What are the twenty qualities described in this chapter?",
        a: "They include humility, lack of pride, non-violence, tolerance, simplicity, service to the teacher, purity, steadfastness, self-control, detachment from sensory objects, and constant meditation on the self.",
      },
    ],
    verses: [
      {
        chapter: 13,
        verse: 1,
        sanskrit:
          "श्रीभगवानुवाच |\nइदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते |\nएतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः ॥",
        transliteration:
          "śrī bhagavān uvāca |\nidaṃ śarīraṃ kaunteya kṣetram ity abhidhīyate |\netad yo vetti taṃ prāhuḥ kṣetrajña iti tad-vidaḥ",
        hindi:
          "श्रीभगवान् बोले — हे कौंतेय! इस शरीर को 'क्षेत्र' कहते हैं। जो इसे जानता है, उसे 'क्षेत्रज्ञ' कहते हैं।",
        english:
          "The Blessed Lord said: This body, O son of Kunti, is called the field. One who knows this is called the knower of the field.",
      },
      {
        chapter: 13,
        verse: 27,
        sanskrit:
          "समं सर्वेषु भूतेषु तिष्ठन्तं परमेश्वरम् |\nविनश्यत्स्वविनश्यन्तं यः पश्यति स पश्यति ॥",
        transliteration:
          "samaṃ sarveṣu bhūteṣu tiṣṭhantaṃ parameśvaram |\nvinaśyatsv avinaśyantaṃ yaḥ paśyati sa paśyati",
        hindi:
          "जो सभी नाशवान प्राणियों में समभाव से स्थित अविनाशी परमेश्वर को देखता है, वही सच में देखता है।",
        english:
          "One who sees the Supreme Lord equally present in all beings, the undying within the dying — that person truly sees.",
      },
    ],
  },
  {
    id: 14,
    title: "Gunatraya Vibhaga Yoga",
    titleHi: "गुणत्रय विभाग योग",
    titleSanskrit: "गुणत्रयविभागयोग",
    verseCount: 27,
    summary:
      "Krishna explains the three modes of material nature (gunas) — sattva (goodness), rajas (passion), and tamas (ignorance) — and how they bind the soul. He describes how to transcend all three and attain liberation.",
    summaryHi:
      "कृष्ण प्रकृति के तीन गुणों — सत्त्व (गुण), रजस् (जुनून), तमस् (अज्ञान) — और वे आत्मा को कैसे बांधते हैं, इसकी व्याख्या करते हैं। वे बताते हैं कि तीनों को कैसे पार करें और मुक्ति प्राप्त करें।",
    keyTeachings: [
      "Sattva binds by happiness; rajas by desire; tamas by negligence",
      "When sattva predominates, wisdom increases",
      "When rajas predominates, greed and desire increase",
      "When tamas predominates, delusion and sloth increase",
      "One who is not disturbed by the gunas and doesn't desire them is transcendent",
    ],
    famousVerses: [6, 7, 8],
    whyMattersToday:
      "The three gunas framework is arguably the world's oldest personality psychology. Every person can recognise moments of sattva (clarity, joy), rajas (restlessness, ambition), and tamas (lethargy, confusion). Modern wellness science encourages sattvic living through good sleep, pure food, and positive relationships.",
    faq: [
      {
        q: "Which guna is best?",
        a: "Sattva is the most conducive to liberation, but even sattva ultimately binds. The goal is to transcend all three gunas through devotion to God.",
      },
      {
        q: "How do I increase sattva?",
        a: "Through pure food, good company, honest work, adequate sleep, gratitude practices, and regular meditation. Avoid excessive stimulation, late nights, and heavy foods.",
      },
    ],
    verses: [
      {
        chapter: 14,
        verse: 6,
        sanskrit:
          "तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम् |\nसुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ ॥",
        transliteration:
          "tatra sattvaṃ nirmalatvāt prakāśakam anāmayam |\nsukha-saṅgena badhnāti jñāna-saṅgena cānagha",
        hindi:
          "उनमें सत्त्व गुण निर्मल होने के कारण प्रकाशित करने वाला और रोगरहित है। वह सुख की आसक्ति और ज्ञान की आसक्ति से बांधता है।",
        english:
          "Of these, sattva, being pure, is illuminating and free from disease. It binds through attachment to happiness and attachment to knowledge, O sinless one.",
      },
      {
        chapter: 14,
        verse: 17,
        sanskrit:
          "सत्त्वात्संजायते ज्ञानं रजसो लोभ एव च |\nप्रमादमोहौ तमसो भवतोऽज्ञानमेव च ॥",
        transliteration:
          "sattvāt sañjāyate jñānaṃ rajaso lobha eva ca |\npramāda-mohau tamaso bhavato 'jñānam eva ca",
        hindi:
          "सत्त्व से ज्ञान उत्पन्न होता है, रजस् से लोभ, और तमस् से प्रमाद, मोह और अज्ञान उत्पन्न होते हैं।",
        english:
          "From sattva, knowledge arises; from rajas, greed; from tamas, negligence, delusion, and ignorance.",
      },
    ],
  },
  {
    id: 15,
    title: "Purushottama Yoga",
    titleHi: "पुरुषोत्तम योग",
    titleSanskrit: "पुरुषोत्तमयोग",
    verseCount: 20,
    summary:
      "Using the metaphor of the ashvattha tree (cosmic tree with roots above and branches below), Krishna describes the perishable, imperishable, and the Supreme Person who transcends both. Knowing the Purushottama liberates the soul.",
    summaryHi:
      "अश्वत्थ वृक्ष (ऊपर जड़ें, नीचे शाखाएं) के रूपक का उपयोग करते हुए कृष्ण क्षर, अक्षर और पुरुषोत्तम का वर्णन करते हैं। पुरुषोत्तम को जानना आत्मा को मुक्त करता है।",
    keyTeachings: [
      "The cosmic tree of creation is rooted in the divine — cut it with detachment",
      "There are two beings: the perishable (all bodies) and the imperishable (eternal soul)",
      "The Supreme Person transcends both and is known in scriptures as Purushottama",
      "I enter the earth and nourish all plants; I become fire and digest food in all bodies",
    ],
    famousVerses: [1, 15, 18],
    whyMattersToday:
      "The Purushottama concept resolves the apparent conflict between the personal God and the formless Absolute. In modern spirituality, this chapter bridges theism and non-dualism, offering a comprehensive cosmology.",
    faq: [
      {
        q: "What is the upside-down tree metaphor?",
        a: "The eternal is the root above; the temporary creation hangs below as branches. The tree must be 'cut' with the axe of detachment to be free from the cycle of birth and death.",
      },
    ],
    verses: [
      {
        chapter: 15,
        verse: 1,
        sanskrit:
          "ऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम् |\nछन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित् ॥",
        transliteration:
          "ūrdhva-mūlam adhaḥ-śākham aśvatthaṃ prāhur avyayam |\nchandāṃsi yasya parṇāni yas taṃ veda sa veda-vit",
        hindi:
          "वे कहते हैं कि ऊपर जड़ और नीचे शाखाओं वाला अव्यय अश्वत्थ वृक्ष है। वेद उसके पत्ते हैं। जो इसे जानता है, वही वेद को जानता है।",
        english:
          "They speak of an eternal ashvattha tree with roots above and branches below; its leaves are the Vedas. One who knows this tree is a knower of the Vedas.",
      },
      {
        chapter: 15,
        verse: 15,
        sanskrit:
          "सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च |\nवेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् ॥",
        transliteration:
          "sarvasya cāhaṃ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṃ ca |\nvedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham",
        hindi:
          "मैं सभी के हृदय में स्थित हूँ। मुझसे ही स्मृति, ज्ञान और विस्मरण होता है। मैं ही समस्त वेदों द्वारा जानने योग्य हूँ; वेदांत का रचयिता और वेद का ज्ञाता मैं ही हूँ।",
        english:
          "I am seated in the hearts of all. From Me come memory, knowledge, and their loss. I alone am to be known by all the Vedas; I am the author of Vedanta and the knower of the Vedas.",
      },
    ],
  },
  {
    id: 16,
    title: "Daivasura Sampad Vibhaga Yoga",
    titleHi: "दैवासुर सम्पद् विभाग योग",
    titleSanskrit: "दैवासुरसम्पद्विभागयोग",
    verseCount: 24,
    summary:
      "Krishna lists 26 divine qualities (fearlessness, purity, compassion, honesty) and demonic qualities (pride, arrogance, cruelty, ignorance). He urges Arjuna to cultivate the divine and abandon the demonic for liberation.",
    summaryHi:
      "कृष्ण 26 दैवीय गुणों (निडरता, पवित्रता, करुणा, सच्चाई) और आसुरी गुणों (अहंकार, घमंड, क्रूरता, अज्ञान) की सूची देते हैं। वे अर्जुन से दैवीय गुण अपनाने और आसुरी छोड़ने का आग्रह करते हैं।",
    keyTeachings: [
      "Divine qualities lead to liberation; demonic qualities to bondage",
      "Fearlessness, purity, compassion, and honesty are divine virtues",
      "Arrogance, pride, cruelty, and ignorance are demonic vices",
      "Do not be driven by lust, anger, and greed — these are the three gates to hell",
    ],
    famousVerses: [1, 2, 21],
    whyMattersToday:
      "This chapter is essentially an ethics manual. The 26 divine qualities are a character development roadmap relevant to personal growth, leadership, and relationships. The three 'gates to hell' — lust, anger, greed — are recognised in modern psychology as core drivers of destructive behaviour.",
    faq: [
      {
        q: "Are 'demonic' people beyond redemption?",
        a: "The Gita describes qualities, not fixed categories of people. Anyone who recognises demonic qualities in themselves and chooses to change can cultivate divine ones. The labels are descriptive, not permanent.",
      },
    ],
    verses: [
      {
        chapter: 16,
        verse: 1,
        sanskrit:
          "अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः |\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् ॥",
        transliteration:
          "abhayaṃ sattva-saṃśuddhir jñāna-yoga-vyavasthitiḥ |\ndānaṃ damaś ca yajñaś ca svādhyāyas tapa ārjavam",
        hindi:
          "निडरता, सत्त्व की शुद्धि, ज्ञानयोग में स्थिति, दान, इंद्रिय-संयम, यज्ञ, स्वाध्याय, तप और सरलता —",
        english:
          "Fearlessness, purity of heart, steadfastness in knowledge and yoga, charity, self-control, sacrifice, study of scriptures, austerity, and straightforwardness —",
      },
      {
        chapter: 16,
        verse: 21,
        sanskrit:
          "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः |\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् ॥",
        transliteration:
          "tri-vidhaṃ narakasyedaṃ dvāraṃ nāśanam ātmanaḥ |\nkāmaḥ krodhas tathā lobhas tasmād etat trayaṃ tyajet",
        hindi:
          "काम, क्रोध और लोभ — ये तीन प्रकार के नरक के द्वार आत्मा का नाश करने वाले हैं। इसलिए इन तीनों को त्याग देना चाहिए।",
        english:
          "Lust, anger, and greed are the three gates to self-destruction and hell. Therefore abandon these three.",
      },
    ],
  },
  {
    id: 17,
    title: "Shraddhatraya Vibhaga Yoga",
    titleHi: "श्रद्धात्रय विभाग योग",
    titleSanskrit: "श्रद्धात्रयविभागयोग",
    verseCount: 28,
    summary:
      "Krishna classifies faith, food, sacrifice, charity, and austerity into sattvic, rajasic, and tamasic categories. He introduces 'Om Tat Sat' — the threefold symbol of Brahman — and emphasises that all auspicious acts should be performed with this invocation.",
    summaryHi:
      "कृष्ण श्रद्धा, भोजन, यज्ञ, दान और तप को सात्त्विक, राजसिक और तामसिक श्रेणियों में वर्गीकृत करते हैं। वे 'ओम तत् सत्' — ब्रह्म के त्रिगुण प्रतीक — का परिचय देते हैं।",
    keyTeachings: [
      "Faith reflects a person's true inner nature",
      "Sattvic food is pure, sustaining, and promotes health",
      "Charity given as a duty, without expectation, is sattvic",
      "Om Tat Sat — the three syllables represent Brahman, Truth, and Goodness",
    ],
    famousVerses: [3, 17, 20],
    whyMattersToday:
      "The classification of foods into sattvic, rajasic, and tamasic aligns remarkably with modern nutritional science — fresh, light foods vs. processed, stimulating foods. The principle of 'give without expectation of return' is the foundation of sustainable generosity.",
    faq: [
      {
        q: "What is Om Tat Sat?",
        a: "A threefold designation of the ultimate reality. Om is the primal sound; Tat means 'that' (pointing to the infinite); Sat means 'truth' or 'existence'. Together they affirm the reality of the divine.",
      },
    ],
    verses: [
      {
        chapter: 17,
        verse: 3,
        sanskrit:
          "सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत |\nश्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः ॥",
        transliteration:
          "sattvānurūpā sarvasya śraddhā bhavati bhārata |\nśraddhā-mayo 'yaṃ puruṣo yo yac-chraddhaḥ sa eva saḥ",
        hindi:
          "हे भारत! सभी की श्रद्धा उनके सत्त्व के अनुसार होती है। यह पुरुष श्रद्धामय है — जो जैसी श्रद्धा रखता है, वह वैसा ही बन जाता है।",
        english:
          "O Bharata, the faith of everyone corresponds to their inherent nature. The person is made of faith — as their faith is, so they become.",
      },
      {
        chapter: 17,
        verse: 20,
        sanskrit:
          "दातव्यमिति यद्दानं दीयतेऽनुपकारिणे |\nदेशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम् ॥",
        transliteration:
          "dātavyam iti yad dānaṃ dīyate 'nupakāriṇe |\ndeśe kāle ca pātre ca tad dānaṃ sāttvikaṃ smṛtam",
        hindi:
          "'देना मेरा कर्तव्य है' — इस भाव से जो दान, प्रत्युपकार की अपेक्षा न रखते हुए, उचित देश, काल और पात्र को दिया जाता है, वह सात्त्विक दान कहलाता है।",
        english:
          "Charity given as a duty, expecting nothing in return, to the right person at the right place and time — that is considered sattvic charity.",
      },
    ],
  },
  {
    id: 18,
    title: "Moksha Sanyasa Yoga",
    titleHi: "मोक्ष संन्यास योग",
    titleSanskrit: "मोक्षसंन्यासयोग",
    verseCount: 78,
    summary:
      "The longest and culminating chapter summarises all teachings. Krishna defines renunciation and tyaga, analyses the components of action, describes the highest devotion, and gives His supreme instruction: 'Abandon all dharmas and take refuge in Me alone.'",
    summaryHi:
      "सबसे लंबा और परिणति अध्याय सभी शिक्षाओं का सारांश प्रस्तुत करता है। कृष्ण संन्यास और त्याग की परिभाषा देते हैं, कर्म के घटकों का विश्लेषण करते हैं, सर्वोच्च भक्ति का वर्णन करते हैं और अपना परम उपदेश देते हैं: 'सभी धर्मों को त्यागकर केवल मेरी शरण लो।'",
    keyTeachings: [
      "The five factors of action: body, doer, instruments, effort, and divine will",
      "Knowledge, action, and doer are also of three types (sattvic, rajasic, tamasic)",
      "The highest devotion — meditating on Me, worshipping Me, surrendering to Me",
      "Sarva-dharman parityajya — abandon all dharmas and take refuge in Me alone (18.66)",
      "Share this wisdom only with the devoted — it is the most secret of all",
    ],
    famousVerses: [63, 65, 66],
    whyMattersToday:
      "Verse 18.66 is the culminating message of the entire Gita — total surrender. In a self-reliant culture, this is a profound teaching about the limits of ego and the freedom found in surrender. The analysis of action's five components is a complete framework for accountability and understanding outcomes.",
    faq: [
      {
        q: "What does 18.66 mean — abandon all dharmas?",
        a: "It does not mean to abandon one's duties. Rather, give up the ego of being the doer of dharma, the anxiety about performing dharma perfectly, and take refuge in God. The act remains; the ego is released.",
      },
      {
        q: "How does the Gita end?",
        a: "With Arjuna declaring his delusion gone, ready to act as directed by Krishna. Sanjaya reflects that wherever Krishna and Arjuna are, there is victory, prosperity, and justice.",
      },
      {
        q: "What is the final teaching of the Gita?",
        a: "Total surrender to God with love. This includes action (karma), devotion (bhakti), and knowledge (jnana) — all culminating in the dissolution of the ego into the divine.",
      },
      {
        q: "Is the Gita a text about war?",
        a: "No. The battlefield is a metaphor for the inner conflict between duty and sentiment, knowledge and ignorance. The Gita is a universal guide for any challenging life situation.",
      },
    ],
    verses: [
      {
        chapter: 18,
        verse: 63,
        sanskrit:
          "इति ते ज्ञानमाख्यातं गुह्याद्गुह्यतरं मया |\nविमृश्यैतदशेषेण यथेच्छसि तथा कुरु ॥",
        transliteration:
          "iti te jñānam ākhyātaṃ guhyād guhyataraṃ mayā |\nvimṛśyaitad aśeṣeṇa yathecchasi tathā kuru",
        hindi:
          "इस प्रकार मैंने तुझे गुह्य से भी गुह्यतर ज्ञान सुनाया। इसे पूर्णतः विचार करके जैसा तू चाहे वैसा कर।",
        english:
          "Thus I have explained to you this most secret of all knowledge. Deliberate on this fully, then do as you choose.",
      },
      {
        chapter: 18,
        verse: 65,
        sanskrit:
          "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु |\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे ॥",
        transliteration:
          "man-manā bhava mad-bhakto mad-yājī māṃ namaskuru |\nmām evaiṣyasi satyaṃ te pratijāne priyo 'si me",
        hindi:
          "मुझमें मन लगा, मेरा भक्त बन, मेरा यजन कर, मुझे नमस्कार कर — तू मुझे ही प्राप्त होगा। मैं तुझसे सत्य प्रतिज्ञा करता हूँ, तू मुझे प्रिय है।",
        english:
          "Think of Me, become My devotee, worship Me, bow down to Me. You will come to Me, I promise you truly, for you are dear to Me.",
        wordMeaning:
          "man-manāḥ=fix mind on Me; mad-bhaktaḥ=My devotee; mad-yājī=worship Me; pratijāne=I promise",
      },
      {
        chapter: 18,
        verse: 66,
        sanskrit:
          "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज |\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥",
        transliteration:
          "sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja |\nahaṃ tvāṃ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
        hindi:
          "सभी धर्मों को त्यागकर केवल मेरी शरण में आ जा। मैं तुझे सभी पापों से मुक्त कर दूंगा — शोक मत कर।",
        english:
          "Abandoning all forms of dharma, take refuge in Me alone. I will liberate you from all sins. Do not grieve.",
        wordMeaning:
          "sarva-dharmān=all dharmas; parityajya=abandoning; śaraṇam=refuge; vraja=go; mokṣayiṣyāmi=I will liberate; mā śucaḥ=do not grieve",
      },
      {
        chapter: 18,
        verse: 78,
        sanskrit:
          "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः |\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ॥",
        transliteration:
          "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanur-dharaḥ |\ntatra śrīr vijayo bhūtir dhruvā nītir matir mama",
        hindi:
          "जहाँ योगेश्वर कृष्ण हैं और जहाँ धनुर्धर अर्जुन है, वहाँ श्री (समृद्धि), विजय, विभूति (ऐश्वर्य) और अचल नीति है — ऐसा मेरा मत है।",
        english:
          "Wherever there is Krishna, the Lord of Yoga, and wherever there is Arjuna, the archer, there will surely be prosperity, victory, happiness, and righteousness. This is my conviction.",
      },
    ],
  },
];
