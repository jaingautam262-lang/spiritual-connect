export interface GitaVerse {
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  hindi: string;
  english: string;
  isFamous?: boolean;
  famousTag?: string;
}

export const gitaVerses: GitaVerse[] = [
  // ── CHAPTER 1 ──
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
    verse: 11,
    sanskrit: "अयनेषु च सर्वेषु यथाभागमवस्थिताः |\nभीष्ममेवाभिरक्षन्तु भवन्तः सर्व एव हि ॥",
    transliteration:
      "ayaneṣu ca sarveṣu yathābhāgam avasthitāḥ |\nbhīṣmam evābhirakṣantu bhavantaḥ sarva eva hi",
    hindi:
      "अपने-अपने मोर्चों पर सब अपनी-अपनी जगह खड़े रहकर, सब मिलकर भीष्म पितामह की रक्षा करें।",
    english:
      "All of you, taking your respective positions as assigned, protect Grandfather Bhishma from all sides.",
  },
  {
    chapter: 1,
    verse: 28,
    sanskrit:
      "अर्जुन उवाच |\nदृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम् |\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति ॥",
    transliteration:
      "arjuna uvāca |\ndṛṣṭvemaṃ svajanaṃ kṛṣṇa yuyutsuṃ samupasthitam |\nsīdanti mama gātrāṇi mukhaṃ ca pariśuṣyati",
    hindi:
      "अर्जुन बोले — हे कृष्ण! युद्ध के लिए उत्सुक इन अपने स्वजनों को देखकर मेरे अंग शिथिल हो रहे हैं और मुँह सूख रहा है।",
    english:
      "Arjuna said: O Krishna, seeing my own kinsmen arrayed here, eager to fight, my limbs fail and my mouth is parched.",
    isFamous: true,
    famousTag: "अर्जुन का विषाद",
  },
  {
    chapter: 1,
    verse: 29,
    sanskrit: "वेपथुश्च शरीरे मे रोमहर्षश्च जायते |\nगाण्डीवं स्रंसते हस्तात्त्वक्चैव परिदह्यते ॥",
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
      "O Krishna, I desire neither victory, nor kingdom, nor pleasures. O Govinda, what good is a kingdom, or pleasures, or even life itself?",
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

  // ── CHAPTER 2 ──
  {
    chapter: 2,
    verse: 11,
    sanskrit:
      "श्रीभगवानुवाच |\nअशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे |\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः ॥",
    transliteration:
      "śrī bhagavān uvāca |\naśocyān anvaśocas tvaṃ prajñāvādāṃś ca bhāṣase |\ngatāsūn agatāsūṃś ca nānuśocanti paṇḍitāḥ",
    hindi:
      "श्रीभगवान् बोले — तू न शोक करने योग्य पर शोक करता है और ज्ञान की बातें करता है। जो जा चुके और जो नहीं गए, उन दोनों के लिए पंडित शोक नहीं करते।",
    english:
      "The Blessed Lord said: You grieve for those who should not be grieved for, and yet speak words of wisdom. The wise grieve neither for the living nor for the dead.",
  },
  {
    chapter: 2,
    verse: 19,
    sanskrit:
      "य एनं वेत्ति हन्तारं यश्चैनं मन्यते हतम् |\nउभौ तौ न विजानीतो नायं हन्ति न हन्यते ॥",
    transliteration:
      "ya enaṃ vetti hantāraṃ yaś cainaṃ manyate hatam |\nubhau tau na vijānīto nāyaṃ hanti na hanyate",
    hindi:
      "जो इसे मारने वाला समझता है और जो इसे मरा हुआ मानता है — दोनों ही नहीं जानते। यह आत्मा न मारती है और न मारी जाती है।",
    english:
      "One who thinks this soul is a slayer and one who thinks it is slain — both of them fail to perceive the truth. This soul neither slays nor is slain.",
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
    isFamous: true,
    famousTag: "आत्मा अमर है",
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
      "Just as a person puts on new garments, giving up old worn-out ones, the soul similarly accepts new material bodies, giving up the old and useless ones.",
    isFamous: true,
    famousTag: "आत्मा का पुनर्जन्म",
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
    isFamous: true,
    famousTag: "कर्म योग का सार",
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
      "O Dhananjaya, perform your duties established in yoga, giving up all attachment. Be equal in success and failure — such equanimity is called yoga.",
  },
  {
    chapter: 2,
    verse: 55,
    sanskrit:
      "श्रीभगवानुवाच |\nप्रजहाति यदा कामान्सर्वान्पार्थ मनोगतान् |\nआत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते ॥",
    transliteration:
      "śrī bhagavān uvāca |\nprajahāti yadā kāmān sarvān pārtha manogatān |\nātmany evātmanā tuṣṭaḥ sthitaprajñas tadocyate",
    hindi:
      "श्रीभगवान् बोले — हे पार्थ! जब पुरुष मन की सभी कामनाओं को त्याग देता है और आत्मा में ही आत्मा से संतुष्ट रहता है, तब उसे स्थितप्रज्ञ कहते हैं।",
    english:
      "The Blessed Lord said: O Partha, when a person abandons all desires that enter the mind, and is satisfied in the self by the self alone, they are called a person of steady wisdom.",
  },

  // ── CHAPTER 3 ──
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
    isFamous: true,
    famousTag: "आदर्श नेतृत्व",
  },
  {
    chapter: 3,
    verse: 27,
    sanskrit:
      "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः |\nअहंकारविमूढात्मा कर्ताहमिति मन्यते ॥",
    transliteration:
      "prakṛteḥ kriyamāṇāni guṇaiḥ karmāṇi sarvaśaḥ |\nahaṃkāra-vimūḍhātmā kartāham iti manyate",
    hindi:
      "सभी कर्म प्रकृति के गुणों द्वारा संपन्न किए जाते हैं, किंतु अहंकार से मोहित आत्मा यह मान लेती है कि मैं ही कर्ता हूँ।",
    english:
      "All actions are carried out by the modes of material nature. One who is deluded by ego thinks 'I am the doer'.",
  },
  {
    chapter: 3,
    verse: 37,
    sanskrit:
      "श्रीभगवानुवाच |\nकाम एष क्रोध एष रजोगुणसमुद्भवः |\nमहाशनो महापाप्मा विद्ध्येनमिह वैरिणम् ॥",
    transliteration:
      "śrī bhagavān uvāca |\nkāma eṣa krodha eṣa rajo-guṇa-samudbhavaḥ |\nmahāśano mahāpāpmā viddhy enam iha vairiṇam",
    hindi:
      "श्रीभगवान् बोले — यह काम (वासना) है, यह क्रोध है — रजोगुण से उत्पन्न, बहुत खाने वाला और महापापी। इसे इस लोक में शत्रु जान।",
    english:
      "The Blessed Lord said: It is lust, it is anger, born of the mode of passion — all-devouring and most sinful. Know this to be the enemy here.",
  },
  {
    chapter: 3,
    verse: 43,
    sanskrit:
      "एवं बुद्धेः परं बुद्ध्वा संस्तभ्यात्मानमात्मना |\nजहि शत्रुं महाबाहो कामरूपं दुरासदम् ॥",
    transliteration:
      "evaṃ buddheḥ paraṃ buddhvā saṃstabhyātmānam ātmanā |\njahi śatruṃ mahābāho kāma-rūpaṃ durāsadam",
    hindi:
      "हे महाबाहो! इस प्रकार बुद्धि से परे (आत्मा को) जानकर, बुद्धि द्वारा अपने मन को वश में करके, इस दुर्जय काम-रूप शत्रु का नाश कर।",
    english:
      "O mighty-armed, knowing the self to be transcendental to the material senses, mind and intellect, steady the mind by deliberate spiritual intelligence and thus, by spiritual strength, conquer this insatiable enemy known as lust.",
  },

  // ── CHAPTER 4 ──
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
    isFamous: true,
    famousTag: "अवतार का प्रयोजन",
  },
  {
    chapter: 4,
    verse: 8,
    sanskrit:
      "परित्राणाय साधूनां विनाशाय च दुष्कृताम् |\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥",
    transliteration:
      "paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām |\ndharma-saṃsthāpanārthāya sambhavāmi yuge yuge",
    hindi:
      "साधु लोगों की रक्षा के लिए, दुष्टों के विनाश के लिए और धर्म की पुनः स्थापना के लिए मैं युग-युग में जन्म लेता हूँ।",
    english:
      "To deliver the righteous, to destroy the wicked, and to reestablish dharma, I advent Myself millennium after millennium.",
    isFamous: true,
    famousTag: "युग-युग में अवतार",
  },
  {
    chapter: 4,
    verse: 9,
    sanskrit:
      "जन्म कर्म च मे दिव्यमेवं यो वेत्ति तत्त्वतः |\nत्यक्त्वा देहं पुनर्जन्म नैति मामेति सोऽर्जुन ॥",
    transliteration:
      "janma karma ca me divyam evaṃ yo vetti tattvataḥ |\ntyaktvā dehaṃ punar janma naiti mām eti so 'rjuna",
    hindi:
      "हे अर्जुन! जो मेरे दिव्य जन्म और कर्म को तत्त्व से जानता है, वह शरीर छोड़ने पर पुनर्जन्म नहीं लेता — मुझे ही प्राप्त होता है।",
    english:
      "O Arjuna, one who knows the divine nature of My birth and activities — upon leaving the body, they do not take birth again but come to Me.",
  },
  {
    chapter: 4,
    verse: 34,
    sanskrit:
      "तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया |\nउपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः ॥",
    transliteration:
      "tad viddhi praṇipātena paripraśnena sevayā |\nupadekṣyanti te jñānaṃ jñāninas tattva-darśinaḥ",
    hindi:
      "उस ज्ञान को प्रणाम, प्रश्न और सेवा द्वारा प्राप्त करो। तत्त्वदर्शी ज्ञानी तुम्हें ज्ञान का उपदेश देंगे।",
    english:
      "Acquire that knowledge through reverence, earnest inquiry, and service. The wise ones who have seen the truth will impart the knowledge to you.",
  },
  {
    chapter: 4,
    verse: 38,
    sanskrit:
      "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते |\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति ॥",
    transliteration:
      "na hi jñānena sadṛśaṃ pavitram iha vidyate |\ntat svayaṃ yoga-saṃsiddhaḥ kālenātmani vindati",
    hindi:
      "इस संसार में ज्ञान के समान पवित्र करने वाला कुछ भी नहीं है। योग में सिद्ध पुरुष इसे समय पर स्वयं अपने आप में पाता है।",
    english:
      "Indeed, there is nothing so purifying in this world as knowledge. One who is perfected in yoga finds this knowledge within themselves in due time.",
  },
  {
    chapter: 4,
    verse: 40,
    sanskrit:
      "अज्ञश्चाश्रद्दधानश्च संशयात्मा विनश्यति |\nनायं लोकोऽस्ति न परो न सुखं संशयात्मनः ॥",
    transliteration:
      "ajñaś cāśraddadhānaś ca saṃśayātmā vinaśyati |\nnāyaṃ loko 'sti na paro na sukhaṃ saṃśayātmanaḥ",
    hindi:
      "अज्ञानी, श्रद्धाहीन और संशयात्मा व्यक्ति नष्ट हो जाता है। संशयात्मा के लिए न यह लोक है, न परलोक और न सुख।",
    english:
      "One who is ignorant, faithless, and doubting is ruined. For the doubting soul, there is happiness neither in this world nor the next.",
  },

  // ── CHAPTER 5 ──
  {
    chapter: 5,
    verse: 7,
    sanskrit:
      "योगयुक्तो विशुद्धात्मा विजितात्मा जितेन्द्रियः |\nसर्वभूतात्मभूतात्मा कुर्वन्नपि न लिप्यते ॥",
    transliteration:
      "yoga-yukto viśuddhātmā vijitātmā jitendriyaḥ |\nsarva-bhūtātma-bhūtātmā kurvann api na lipyate",
    hindi:
      "जो योग से युक्त, शुद्धात्मा, जीते हुए मन और इंद्रियों वाला है, जिसकी आत्मा सभी प्राणियों की आत्मा से एक है — वह कर्म करते हुए भी लिप्त नहीं होता।",
    english:
      "One who is engaged in devotional service, with a purified soul, with self-controlled mind and senses, seeing oneself in all beings — though acting is not tainted.",
  },
  {
    chapter: 5,
    verse: 10,
    sanskrit:
      "ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः |\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा ॥",
    transliteration:
      "brahmaṇy ādhāya karmāṇi saṅgaṃ tyaktvā karoti yaḥ |\nlipyate na sa pāpena padma-patram ivāmbhasā",
    hindi:
      "जो ब्रह्म में कर्म अर्पित करके, आसक्ति त्याग कर कर्म करता है, वह पाप से नहीं लिपता — जैसे कमल का पत्ता जल से।",
    english:
      "One who offers all actions to Brahman and acts without attachment is not tainted by sin, just as a lotus leaf is untouched by water.",
    isFamous: true,
    famousTag: "कमल की भाँति",
  },
  {
    chapter: 5,
    verse: 18,
    sanskrit:
      "विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि |\nशुनि चैव श्वपाके च पण्डिताः समदर्शिनः ॥",
    transliteration:
      "vidyā-vinaya-sampanne brāhmaṇe gavi hastini |\nśuni caiva śvapāke ca paṇḍitāḥ sama-darśinaḥ",
    hindi:
      "ज्ञानी पुरुष विद्या और विनय से युक्त ब्राह्मण में, गाय में, हाथी में, कुत्ते में और चांडाल में भी समान दृष्टि रखते हैं।",
    english:
      "The wise see with equal eyes a learned and humble brahmin, a cow, an elephant, a dog, and a dog-eater (outcaste).",
  },
  {
    chapter: 5,
    verse: 22,
    sanskrit:
      "ये हि संस्पर्शजा भोगा दुःखयोनय एव ते |\nआद्यन्तवन्तः कौन्तेय न तेषु रमते बुधः ॥",
    transliteration:
      "ye hi saṃsparśajā bhogā duḥkha-yonaya eva te |\nādy-antavantaḥ kaunteya na teṣu ramate budhaḥ",
    hindi:
      "इंद्रियों के संपर्क से उत्पन्न जो भोग हैं, वे दुःख के ही कारण हैं। हे कौन्तेय! वे आदि-अंत वाले हैं — बुद्धिमान उनमें नहीं रमता।",
    english:
      "The pleasures born of sense contact are sources of suffering alone. They have a beginning and an end, O Kaunteya; the wise do not delight in them.",
  },
  {
    chapter: 5,
    verse: 29,
    sanskrit:
      "भोक्तारं यज्ञतपसां सर्वलोकमहेश्वरम् |\nसुहृदं सर्वभूतानां ज्ञात्वा मां शान्तिमृच्छति ॥",
    transliteration:
      "bhoktāraṃ yajña-tapasāṃ sarva-loka-maheśvaram |\nsuhṛdaṃ sarva-bhūtānāṃ jñātvā māṃ śāntim ṛcchati",
    hindi:
      "मुझे यज्ञ और तप का भोक्ता, सभी लोकों का महेश्वर और सभी प्राणियों का सुहृद (मित्र) जानकर मनुष्य शांति को प्राप्त होता है।",
    english:
      "Knowing Me as the enjoyer of all sacrifices and austerities, the Supreme Lord of all worlds, and the benevolent friend of all beings — one attains peace.",
  },

  // ── CHAPTER 6 ──
  {
    chapter: 6,
    verse: 5,
    sanskrit:
      "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् |\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥",
    transliteration:
      "uddhared ātmanātmānaṃ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
    hindi:
      "अपने द्वारा अपना उद्धार करे, अपने को अधोगति में न डाले। क्योंकि आत्मा ही अपना मित्र है और आत्मा ही अपना शत्रु है।",
    english:
      "Let a person elevate themselves by their own mind; let them not degrade themselves, for the self alone is one's friend and the self alone is one's enemy.",
    isFamous: true,
    famousTag: "स्वयं का उद्धार",
  },
  {
    chapter: 6,
    verse: 6,
    sanskrit:
      "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः |\nअनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत् ॥",
    transliteration:
      "bandhur ātmātmanas tasya yenātmaivātmanā jitaḥ |\nanātmanas tu śatrutve vartetātmaiva śatruvat",
    hindi:
      "जिसने अपनी आत्मा को जीत लिया है, उसके लिए आत्मा ही मित्र है। जिसने नहीं जीता, उसके लिए आत्मा शत्रु की तरह काम करती है।",
    english:
      "For one who has conquered the mind, the self is the best friend; but for one who has failed to do so, the self will remain the greatest enemy.",
  },
  {
    chapter: 6,
    verse: 19,
    sanskrit:
      "यथा दीपो निवातस्थो नेङ्गते सोपमा स्मृता |\nयोगिनो यतचित्तस्य युञ्जतो योगमात्मनः ॥",
    transliteration:
      "yathā dīpo nivātastho neṅgate sopamā smṛtā |\nyogino yata-cittasya yuñjato yogam ātmanaḥ",
    hindi:
      "जैसे वायुरहित स्थान में दीपक हिलता नहीं — यह उपमा उस योगी के लिए दी गई है जिसका चित्त वश में है और जो आत्मा के ध्यान में लगा है।",
    english:
      "Like a lamp in a windless place that does not flicker — this is the image of a yogi of controlled mind practicing yoga of the self.",
  },
  {
    chapter: 6,
    verse: 34,
    sanskrit:
      "चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम् |\nतस्याहं निग्रहं मन्ये वायोरिव सुदुष्करम् ॥",
    transliteration:
      "cañcalaṃ hi manaḥ kṛṣṇa pramāthi balavad dṛḍham |\ntasyāhaṃ nigrahaṃ manye vāyor iva suduṣkaram",
    hindi:
      "हे कृष्ण! मन बड़ा चंचल, प्रमाथी (हलचल करने वाला), बलवान और दृढ़ है। मैं उसका निग्रह वायु को रोकने की तरह अत्यंत कठिन समझता हूँ।",
    english:
      "O Krishna, the mind is restless, turbulent, obstinate, and very strong. To subdue it seems as difficult as controlling the wind.",
  },
  {
    chapter: 6,
    verse: 47,
    sanskrit:
      "योगिनामपि सर्वेषां मद्गतेनान्तरात्मना |\nश्रद्धावान्भजते यो मां स मे युक्ततमो मतः ॥",
    transliteration:
      "yoginām api sarveṣāṃ mad-gatenāntarātmanā |\nśraddhāvān bhajate yo māṃ sa me yuktatamo mataḥ",
    hindi:
      "सभी योगियों में से जो श्रद्धावान् मुझमें मन लगाकर मेरी भक्ति करता है, वह मुझे सर्वश्रेष्ठ योगी मान्य है।",
    english:
      "Of all yogis, one who worships Me with great faith, with inner self fixed in Me — I consider that yogi to be the most perfectly united with Me.",
  },

  // ── CHAPTER 7 ──
  {
    chapter: 7,
    verse: 4,
    sanskrit:
      "भूमिरापोऽनलो वायुः खं मनो बुद्धिरेव च |\nअहंकार इतीयं मे भिन्ना प्रकृतिरष्टधा ॥",
    transliteration:
      "bhūmir āpo 'nalo vāyuḥ khaṃ mano buddhir eva ca |\nahaṃkāra itīyaṃ me bhinnā prakṛtir aṣṭadhā",
    hindi:
      "पृथ्वी, जल, अग्नि, वायु, आकाश, मन, बुद्धि और अहंकार — ये मेरी आठ प्रकार की भिन्न (अपरा) प्रकृति है।",
    english:
      "Earth, water, fire, air, ether, mind, intelligence and ego — altogether these eight comprise My separated lower nature.",
  },
  {
    chapter: 7,
    verse: 7,
    sanskrit:
      "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय |\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव ॥",
    transliteration:
      "mattaḥ parataraṃ nānyat kiñcid asti dhanañjaya |\nmayi sarvam idaṃ protaṃ sūtre maṇi-gaṇā iva",
    hindi:
      "हे धनंजय! मुझसे परे कुछ भी नहीं है। जैसे धागे में मणियाँ पिरोई जाती हैं, वैसे यह सब मुझमें पिरोया हुआ है।",
    english:
      "O Dhananjaya, there is nothing higher than Me. All this is strung in Me as gems on a thread.",
    isFamous: true,
    famousTag: "ईश्वर में पिरोया ब्रह्मांड",
  },
  {
    chapter: 7,
    verse: 14,
    sanskrit:
      "दैवी ह्येषा गुणमयी मम माया दुरत्यया |\nमामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते ॥",
    transliteration:
      "daivī hy eṣā guṇamayī mama māyā duratyayā |\nmām eva ye prapadyante māyām etāṃ taranti te",
    hindi:
      "यह मेरी दिव्य गुणमयी माया दुस्तर है। परंतु जो मेरी शरण लेते हैं, वे इस माया को पार कर जाते हैं।",
    english:
      "This divine energy of Mine, made of the three modes of nature, is very difficult to overcome. But those who surrender unto Me can easily cross beyond it.",
  },
  {
    chapter: 7,
    verse: 16,
    sanskrit:
      "चतुर्विधा भजन्ते मां जनाः सुकृतिनोऽर्जुन |\nआर्तो जिज्ञासुरर्थार्थी ज्ञानी च भरतर्षभ ॥",
    transliteration:
      "catur-vidhā bhajante māṃ janāḥ sukṛtino 'rjuna |\nārto jijñāsur arthārthī jñānī ca bharatarṣabha",
    hindi:
      "हे अर्जुन! चार प्रकार के पुण्यात्मा मनुष्य मुझे भजते हैं — आर्त (दुखी), जिज्ञासु, अर्थार्थी (धन चाहने वाला) और ज्ञानी।",
    english:
      "O Arjuna, four kinds of virtuous men begin to render devotional service — the distressed, the seeker of knowledge, the seeker of wealth, and the wise.",
  },
  {
    chapter: 7,
    verse: 19,
    sanskrit:
      "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते |\nवासुदेवः सर्वमिति स महात्मा सुदुर्लभः ॥",
    transliteration:
      "bahūnāṃ janmanām ante jñānavān māṃ prapadyate |\nvāsudevaḥ sarvam iti sa mahātmā sudurlabhaḥ",
    hindi:
      "बहुत जन्मों के अंत में ज्ञानी पुरुष मुझे प्राप्त होता है — 'वासुदेव ही सब कुछ है' — ऐसा महात्मा अत्यंत दुर्लभ है।",
    english:
      "After many births, the man of wisdom surrenders unto Me, realizing that Vasudeva (Krishna) is everything. Such a great soul is very rare.",
  },

  // ── CHAPTER 8 ──
  {
    chapter: 8,
    verse: 5,
    sanskrit:
      "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम् |\nयः प्रयाति स मद्भावं याति नास्त्यत्र संशयः ॥",
    transliteration:
      "anta-kāle ca mām eva smaran muktvā kalevaram |\nyaḥ prayāti sa mad-bhāvaṃ yāti nāsty atra saṃśayaḥ",
    hindi:
      "जो पुरुष अंतकाल में भी मुझे याद करते हुए शरीर छोड़ता है, वह मेरे स्वरूप को प्राप्त होता है — इसमें कोई संदेह नहीं।",
    english:
      "Whoever, at the time of death, remembers Me alone and leaves the body — they will attain My divine nature. There is no doubt.",
    isFamous: true,
    famousTag: "अंतिम स्मरण",
  },
  {
    chapter: 8,
    verse: 6,
    sanskrit:
      "यं यं वापि स्मरन्भावं त्यजत्यन्ते कलेवरम् |\nतं तमेवैति कौन्तेय सदा तद्भावभावितः ॥",
    transliteration:
      "yaṃ yaṃ vāpi smaran bhāvaṃ tyajaty ante kalevaram |\ntaṃ tam evaiti kaunteya sadā tad-bhāva-bhāvitaḥ",
    hindi:
      "हे कौन्तेय! जो पुरुष अंत में जिस-जिस भाव का स्मरण करते हुए शरीर छोड़ता है, उस-उस भाव से सदा भावित होने से वह उसी को प्राप्त होता है।",
    english:
      "O Kaunteya, whatever state of being one remembers when giving up the body — to that state one always goes, being constantly absorbed in that state.",
  },
  {
    chapter: 8,
    verse: 7,
    sanskrit: "तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च |\nमय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयः ॥",
    transliteration:
      "tasmāt sarveṣu kāleṣu mām anusmara yudhya ca |\nmayyarpita-mano-buddhir mām evaiṣyasy asaṃśayaḥ",
    hindi:
      "इसलिए सभी समय में मुझे याद करते रहो और युद्ध भी करो। मन-बुद्धि मुझे अर्पित करके निःसंदेह मुझे ही प्राप्त होगा।",
    english:
      "Therefore, always remember Me and fight. With your mind and intellect surrendered to Me, you will come to Me without doubt.",
  },
  {
    chapter: 8,
    verse: 14,
    sanskrit:
      "अनन्यचेताः सततं यो मां स्मरति नित्यशः |\nतस्याहं सुलभः पार्थ नित्ययुक्तस्य योगिनः ॥",
    transliteration:
      "ananya-cetāḥ satataṃ yo māṃ smarati nityaśaḥ |\ntasyāhaṃ sulabhaḥ pārtha nitya-yuktasya yoginaḥ",
    hindi:
      "हे पार्थ! जो पुरुष अनन्य चित्त से नित्य-निरंतर मेरा स्मरण करता है, उस नित्य-युक्त योगी के लिए मैं सुलभ हूँ।",
    english:
      "O Partha, I am easily attained by the person who is always thinking of Me and who is engaged in devotional service, with single-minded focus.",
  },
  {
    chapter: 8,
    verse: 20,
    sanskrit:
      "परस्तस्मात्तु भावोऽन्योऽव्यक्तोऽव्यक्तात्सनातनः |\nयः स सर्वेषु भूतेषु नश्यत्सु न विनश्यति ॥",
    transliteration:
      "paras tasmāt tu bhāvo 'nyo 'vyakto 'vyaktāt sanātanaḥ |\nyaḥ sa sarveṣu bhūteṣu naśyatsu na vinaśyati",
    hindi:
      "उस अव्यक्त से भी परे एक और सनातन अव्यक्त भाव है, जो सभी प्राणियों के नष्ट होने पर भी नष्ट नहीं होता।",
    english:
      "But beyond that unmanifested state, there is another, eternal, unmanifested existence, which is not dissolved when all beings are annihilated.",
  },

  // ── CHAPTER 9 ──
  {
    chapter: 9,
    verse: 17,
    sanskrit:
      "पिताहमस्य जगतो माता धाता पितामहः |\nवेद्यं पवित्रमोंकार ऋक्साम यजुरेव च ॥",
    transliteration:
      "pitāham asya jagato mātā dhātā pitāmahaḥ |\nvedyaṃ pavitram oṃkāra ṛk sāma yajur eva ca",
    hindi:
      "मैं इस जगत् का पिता, माता, धारण करने वाला और पितामह हूँ। जानने योग्य, पवित्र, ओंकार, ऋग्वेद, सामवेद और यजुर्वेद भी मैं ही हूँ।",
    english:
      "I am the father of this universe, the mother, the support and the grandfather. I am the object of knowledge, the purifier and the syllable Om. I am the Rig, Sama and Yajur Vedas.",
  },
  {
    chapter: 9,
    verse: 22,
    sanskrit:
      "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते |\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥",
    transliteration:
      "ananyāś cintayanto māṃ ye janāḥ paryupāsate |\nteṣāṃ nityābhiyuktānāṃ yoga-kṣemaṃ vahāmy aham",
    hindi:
      "जो अनन्य भाव से मेरा चिंतन करते हुए मुझे उपासते हैं, उन नित्य-युक्त भक्तों का योग (प्राप्ति) और क्षेम (रक्षा) मैं वहन करता हूँ।",
    english:
      "For those who worship Me with devotion, meditating on My form, I carry what they lack and preserve what they have.",
    isFamous: true,
    famousTag: "भक्तों की देखभाल",
  },
  {
    chapter: 9,
    verse: 26,
    sanskrit:
      "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति |\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥",
    transliteration:
      "patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati |\ntad ahaṃ bhakty-upahṛtam aśnāmi prayatātmanaḥ",
    hindi:
      "जो भक्तिपूर्वक मुझे पत्ता, फूल, फल या जल अर्पित करता है, उस शुद्धमन भक्त की भक्तिपूर्वक की हुई उस चीज़ को मैं स्वीकार करता हूँ।",
    english:
      "Whoever offers Me with devotion a leaf, a flower, a fruit or water — I accept that offering made with love by the pure-hearted.",
    isFamous: true,
    famousTag: "भक्ति का भोग",
  },
  {
    chapter: 9,
    verse: 27,
    sanskrit:
      "यत्करोषि यदश्नासि यज्जुहोषि ददासि यत् |\nयत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम् ॥",
    transliteration:
      "yat karoṣi yad aśnāsi yaj juhoṣi dadāsi yat |\nyat tapasyasi kaunteya tat kuruṣva mad-arpaṇam",
    hindi:
      "हे कौन्तेय! जो भी तू करता है, खाता है, यज्ञ करता है, दान देता है और जो तप करता है — वह सब मुझे अर्पण कर।",
    english:
      "O Kaunteya, whatever you do, whatever you eat, whatever you offer in sacrifice, whatever you give away, and whatever austerities you practice — do that as an offering to Me.",
  },
  {
    chapter: 9,
    verse: 34,
    sanskrit:
      "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु |\nमामेवैष्यसि युक्त्वैवमात्मानं मत्परायणः ॥",
    transliteration:
      "man-manā bhava mad-bhakto mad-yājī māṃ namaskuru |\nmām evaiṣyasi yuktvaiṣam ātmānaṃ mat-parāyaṇaḥ",
    hindi:
      "मुझमें मन लगा, मेरा भक्त बन, मेरा पूजन कर और मुझे प्रणाम कर। इस प्रकार आत्मा को मेरे प्रति समर्पित करके मुझे ही प्राप्त होगा।",
    english:
      "Always think of Me, be devoted to Me, worship Me, and bow down to Me. Dedicating yourself to Me, you will come to Me.",
  },

  // ── CHAPTER 10 ──
  {
    chapter: 10,
    verse: 8,
    sanskrit:
      "अहं सर्वस्य प्रभवो मत्तः सर्वं प्रवर्तते |\nइति मत्वा भजन्ते मां बुधा भावसमन्विताः ॥",
    transliteration:
      "ahaṃ sarvasya prabhavo mattaḥ sarvaṃ pravartate |\niti matvā bhajante māṃ budhā bhāva-samanvitāḥ",
    hindi:
      "मैं सबका स्रोत हूँ, मुझसे ही सब कुछ उत्पन्न होता है — ऐसा जानकर, भाव-सहित बुद्धिमान मनुष्य मेरी भक्ति करते हैं।",
    english:
      "I am the source of all spiritual and material worlds. Everything emanates from Me. The wise who know this perfectly worship Me with whole-hearted devotion.",
  },
  {
    chapter: 10,
    verse: 20,
    sanskrit: "अहमात्मा गुडाकेश सर्वभूताशयस्थितः |\nअहमादिश्च मध्यं च भूतानामन्त एव च ॥",
    transliteration:
      "aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ |\naham ādiś ca madhyaṃ ca bhūtānām anta eva ca",
    hindi:
      "हे गुडाकेश! मैं समस्त प्राणियों के हृदय में स्थित आत्मा हूँ। मैं ही सभी प्राणियों का आदि, मध्य और अंत भी हूँ।",
    english:
      "I am the Self, O Gudakesha, seated in the hearts of all creatures. I am the beginning, the middle, and the end of all beings.",
  },
  {
    chapter: 10,
    verse: 41,
    sanskrit: "यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा |\nतत्तदेवावगच्छ त्वं मम तेजोंऽशसम्भवम् ॥",
    transliteration:
      "yad yad vibhūtimat sattvaṃ śrīmad ūrjitam eva vā |\ntat tad evāvagaccha tvaṃ mama tejo-'ṃśa-sambhavam",
    hindi:
      "जो-जो विभूति (महिमा) वाली, श्रीसम्पन्न और शक्तिशाली वस्तु है, वह-वह मेरे तेज के एक अंश से उत्पन्न हुई है — ऐसा जान।",
    english:
      "Know that all opulent, beautiful, and glorious creations spring from but a spark of My splendor.",
  },
  {
    chapter: 10,
    verse: 42,
    sanskrit: "अथवा बहुनैतेन किं ज्ञातेन तवार्जुन |\nविष्टभ्याहमिदं कृत्स्नमेकांशेन स्थितो जगत् ॥",
    transliteration:
      "atha vā bahunaitena kiṃ jñātena tavārjuna |\nviṣṭabhyāham idaṃ kṛtsnam ekāṃśena sthito jagat",
    hindi:
      "अथवा हे अर्जुन! इस विस्तृत ज्ञान से तेरा क्या प्रयोजन? मैं अपने एक अंश से इस संपूर्ण जगत् को धारण करके स्थित हूँ।",
    english:
      "But what need is there for all this detailed knowledge? With a single fragment of Myself I pervade and support this entire universe.",
  },
  {
    chapter: 10,
    verse: 10,
    sanskrit:
      "तेषां सततयुक्तानां भजतां प्रीतिपूर्वकम् |\nददामि बुद्धियोगं तं येन मामुपयान्ति ते ॥",
    transliteration:
      "teṣāṃ satata-yuktānāṃ bhajatāṃ prīti-pūrvakam |\ndadāmi buddhi-yogaṃ taṃ yena mām upayānti te",
    hindi:
      "जो निरंतर मेरे साथ युक्त होकर प्रेम-भाव से भजते हैं, उन्हें मैं वह बुद्धियोग देता हूँ जिससे वे मुझे प्राप्त होते हैं।",
    english:
      "To those who are constantly devoted and worship Me with love, I give the understanding by which they can come to Me.",
  },

  // ── CHAPTER 11 ──
  {
    chapter: 11,
    verse: 8,
    sanskrit:
      "न तु मां शक्यसे द्रष्टुमनेनैव स्वचक्षुषा |\nदिव्यं ददामि ते चक्षुः पश्य मे योगमैश्वरम् ॥",
    transliteration:
      "na tu māṃ śakyase draṣṭum anenaiva sva-cakṣuṣā |\ndivyaṃ dadāmi te cakṣuḥ paśya me yogam aiśvaram",
    hindi:
      "तू इन अपने नेत्रों से मुझे नहीं देख सकता। मैं तुझे दिव्य नेत्र देता हूँ — मेरे ईश्वरीय योग को देख।",
    english:
      "But with these eyes of yours you cannot see Me. I shall give you the divine eye to see My sovereign yoga (universal form).",
    isFamous: true,
    famousTag: "दिव्य नेत्र",
  },
  {
    chapter: 11,
    verse: 32,
    sanskrit:
      "श्रीभगवानुवाच |\nकालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्तः |\nऋतेऽपि त्वां न भविष्यन्ति सर्वे येऽवस्थिताः प्रत्यनीकेषु योधाः ॥",
    transliteration:
      "śrī bhagavān uvāca |\nkālo 'smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ |\nṛte 'pi tvāṃ na bhaviṣyanti sarve ye 'vasthitāḥ praty-anīkeṣu yodhāḥ",
    hindi:
      "श्रीभगवान् बोले — मैं बड़ा हुआ काल (मृत्यु) हूँ, इस समय लोकों का नाश करने के लिए प्रवृत्त हूँ। तेरे बिना भी जो सामने खड़े हैं वे सब योद्धा नहीं रहेंगे।",
    english:
      "The Blessed Lord said: I am time (death), the destroyer of the worlds, and I have come to engage all people here. Even without your participation, all the soldiers standing in the opposing armies will be slain.",
    isFamous: true,
    famousTag: "मैं काल हूँ",
  },
  {
    chapter: 11,
    verse: 54,
    sanskrit:
      "भक्त्या त्वनन्यया शक्य अहमेवंविधोऽर्जुन |\nज्ञातुं द्रष्टुं च तत्त्वेन प्रवेष्टुं च परंतप ॥",
    transliteration:
      "bhaktyā tv ananyayā śakya aham evaṃ-vidho 'rjuna |\njñātuṃ draṣṭuṃ ca tattvena praveṣṭuṃ ca paraṃtapa",
    hindi:
      "हे परंतप अर्जुन! अनन्य भक्ति द्वारा ही इस रूप में मुझे जाना जा सकता है, देखा जा सकता है और वास्तव में प्रवेश भी किया जा सकता है।",
    english:
      "But by undivided devotion alone can I be known and seen in this form, O Arjuna, and entered into, O scorcher of enemies.",
  },
  {
    chapter: 11,
    verse: 33,
    sanskrit:
      "तस्मात्त्वमुत्तिष्ठ यशो लभस्व जित्वा शत्रून्भुङ्क्ष्व राज्यं समृद्धम् |\nमयैवैते निहताः पूर्वमेव निमित्तमात्रं भव सव्यसाचिन् ॥",
    transliteration:
      "tasmāt tvam uttiṣṭha yaśo labhasva jitvā śatrūn bhuṅkṣva rājyaṃ samṛddham |\nmayaivaite nihitāḥ pūrvam eva nimitta-mātraṃ bhava savyasācin",
    hindi:
      "इसलिए उठ, यश प्राप्त कर, शत्रुओं को जीत और समृद्ध राज्य का भोग कर। ये पहले से ही मेरे द्वारा मारे जा चुके हैं — तू तो केवल निमित्त मात्र बन।",
    english:
      "Therefore arise and attain glory. Conquer your enemies and enjoy a flourishing kingdom. They have already been destroyed by Me — just be My instrument.",
  },
  {
    chapter: 11,
    verse: 55,
    sanskrit:
      "मत्कर्मकृन्मत्परमो मद्भक्तः सङ्गवर्जितः |\nनिर्वैरः सर्वभूतेषु यः स मामेति पाण्डव ॥",
    transliteration:
      "mat-karma-kṛn mat-paramo mad-bhaktaḥ saṅga-varjitaḥ |\nnirvairaḥ sarva-bhūteṣu yaḥ sa mām eti pāṇḍava",
    hindi:
      "हे पांडव! जो मेरे लिए कर्म करता है, मुझे परम लक्ष्य मानता है, मेरा भक्त है, आसक्ति-रहित है और सभी प्राणियों से वैर-रहित है — वह मुझे प्राप्त होता है।",
    english:
      "O Pandava, one who acts for My sake, who regards Me as the supreme goal, who is My devotee, free from attachment, and without enmity toward any being — comes to Me.",
  },

  // ── CHAPTER 12 ──
  {
    chapter: 12,
    verse: 2,
    sanskrit:
      "श्रीभगवानुवाच |\nमय्यावेश्य मनो ये मां नित्ययुक्ता उपासते |\nश्रद्धया परयोपेतास्ते मे युक्ततमा मताः ॥",
    transliteration:
      "śrī bhagavān uvāca |\nmayyāveśya mano ye māṃ nitya-yuktā upāsate |\nśraddhayā parayopetās te me yuktatamā matāḥ",
    hindi:
      "श्रीभगवान् बोले — जो मुझमें मन लगाकर, नित्य-युक्त होकर, परम श्रद्धा से युक्त होकर मेरी उपासना करते हैं, वे मुझे सर्वश्रेष्ठ योगी मान्य हैं।",
    english:
      "The Blessed Lord said: Those who fix their minds on My personal form and always engage in worshipping Me with great transcendental faith — I consider them to be most perfect.",
  },
  {
    chapter: 12,
    verse: 8,
    sanskrit: "मय्येव मन आधत्स्व मयि बुद्धिं निवेशय |\nनिवसिष्यसि मय्येव अत ऊर्ध्वं न संशयः ॥",
    transliteration:
      "mayy eva mana ādhatsva mayi buddhiṃ niveśaya |\nnivasisyasi mayy eva ata ūrdhvaṃ na saṃśayaḥ",
    hindi:
      "मुझमें ही मन लगा और मुझमें ही बुद्धि लगा। इसके बाद तू मुझमें ही निवास करेगा — इसमें कोई संदेह नहीं।",
    english:
      "Just fix your mind upon Me, and engage all your intelligence in Me. Thus you will live in Me always, without a doubt.",
  },
  {
    chapter: 12,
    verse: 13,
    sanskrit:
      "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च |\nनिर्ममो निरहंकारः समदुःखसुखः क्षमी ॥",
    transliteration:
      "adveṣṭā sarva-bhūtānāṃ maitraḥ karuṇa eva ca |\nnirmamo nirahaṃkāraḥ sama-duḥkha-sukhaḥ kṣamī",
    hindi:
      "जो सभी प्राणियों से द्वेष नहीं करता, मित्र और दयालु है, 'मेरा' और अहंकार से रहित है, सुख-दुःख में समान है और क्षमाशील है।",
    english:
      "One who is not envious of any being, who is friendly and compassionate, who is not possessive, not egotistic, equal in pleasure and pain, and forgiving.",
  },
  {
    chapter: 12,
    verse: 15,
    sanskrit:
      "यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः |\nहर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः ॥",
    transliteration:
      "yasmān nodvijate loko lokān nodvijate ca yaḥ |\nharṣāmarṣa-bhayodvegair mukto yaḥ sa ca me priyaḥ",
    hindi:
      "जिससे कोई उद्विग्न नहीं होता और जो खुद किसी से उद्विग्न नहीं होता, जो हर्ष, ईर्ष्या, भय और उद्वेग से मुक्त है — वह मुझे प्रिय है।",
    english:
      "One who does not disturb others and is not disturbed by anyone — free from joy and envy, fear and anxiety — is very dear to Me.",
  },
  {
    chapter: 12,
    verse: 20,
    sanskrit:
      "ये तु धर्म्यामृतमिदं यथोक्तं पर्युपासते |\nश्रद्दधाना मत्परमा भक्तास्तेऽतीव मे प्रियाः ॥",
    transliteration:
      "ye tu dharmyāmṛtam idaṃ yathoktaṃ paryupāsate |\nśraddadhānā mat-paramā bhaktās te 'tīva me priyāḥ",
    hindi:
      "जो इस धर्म-अमृत को जैसा कहा गया वैसे पालन करते हैं, श्रद्धावान् हैं और मुझे परम लक्ष्य मानते हैं — वे भक्त मुझे अत्यंत प्रिय हैं।",
    english:
      "Those who follow this immortal path of devotional service and who completely engage themselves with faith, making Me the supreme goal — are very, very dear to Me.",
  },

  // ── CHAPTER 13 ──
  {
    chapter: 13,
    verse: 1,
    sanskrit:
      "अर्जुन उवाच |\nप्रकृतिं पुरुषं चैव क्षेत्रं क्षेत्रज्ञमेव च |\nएतद्वेदितुमिच्छामि ज्ञानं ज्ञेयं च केशव ॥",
    transliteration:
      "arjuna uvāca |\nprakṛtiṃ puruṣaṃ caiva kṣetraṃ kṣetrajñam eva ca |\netad veditum icchāmi jñānaṃ jñeyaṃ ca keśava",
    hindi:
      "अर्जुन बोले — हे केशव! प्रकृति और पुरुष को, क्षेत्र और क्षेत्रज्ञ को तथा ज्ञान और जानने योग्य को जानना चाहता हूँ।",
    english:
      "Arjuna said: O Keshava, I wish to know about nature, the enjoyer, the field, the knower of the field, knowledge, and the object of knowledge.",
  },
  {
    chapter: 13,
    verse: 8,
    sanskrit:
      "अमानित्वमदम्भित्वमहिंसा क्षान्तिरार्जवम् |\nआचार्योपासनं शौचं स्थैर्यमात्मविनिग्रहः ॥",
    transliteration:
      "amānitvam adambhitvam ahiṃsā kṣāntir ārjavam |\nācāryopāsanaṃ śaucaṃ sthairyam ātma-vinigrahaḥ",
    hindi:
      "मान न करना, दंभ न करना, अहिंसा, क्षमा, सरलता, गुरु की सेवा, शुचिता, स्थिरता और आत्म-संयम।",
    english:
      "Humility, unpretentiousness, non-violence, tolerance, simplicity, serving a spiritual master, cleanliness, steadiness, and self-control.",
  },
  {
    chapter: 13,
    verse: 28,
    sanskrit:
      "समं पश्यन्हि सर्वत्र समवस्थितमीश्वरम् |\nन हिनस्त्यात्मनात्मानं ततो याति परां गतिम् ॥",
    transliteration:
      "samaṃ paśyan hi sarvatra samavasthitam īśvaram |\nna hinasty ātmanātmānaṃ tato yāti parāṃ gatim",
    hindi:
      "जो सर्वत्र परमेश्वर को समान रूप से देखता है, वह आत्मा से आत्मा को नष्ट नहीं करता — और इस प्रकार परम गति को प्राप्त होता है।",
    english:
      "One who sees the Supersoul equally present everywhere does not degrade the self by the self, and thus reaches the transcendental destination.",
  },
  {
    chapter: 13,
    verse: 30,
    sanskrit: "यदा भूतपृथग्भावमेकस्थमनुपश्यति |\nतत एव च विस्तारं ब्रह्म सम्पद्यते तदा ॥",
    transliteration:
      "yadā bhūta-pṛthag-bhāvam eka-stham anupaśyati |\ntata eva ca vistāraṃ brahma sampadyate tadā",
    hindi:
      "जब मनुष्य सभी प्राणियों की भिन्न-भिन्न अवस्थाओं को एक में स्थित देखता है और वहीं से उनका विस्तार देखता है, तब वह ब्रह्म को प्राप्त होता है।",
    english:
      "When a sensible man ceases to see different identities due to different material bodies and sees how beings are expanding from a single source — he then attains Brahman.",
  },
  {
    chapter: 13,
    verse: 27,
    sanskrit:
      "समं सर्वेषु भूतेषु तिष्ठन्तं परमेश्वरम् |\nविनश्यत्स्वविनश्यन्तं यः पश्यति स पश्यति ॥",
    transliteration:
      "samaṃ sarveṣu bhūteṣu tiṣṭhantaṃ parameśvaram |\nvinaśyatsv avinaśyantaṃ yaḥ paśyati sa paśyati",
    hindi:
      "जो नाशवान् सभी प्राणियों में परमेश्वर को समान रूप से स्थित और अविनाशी देखता है — वही वास्तव में देखता है।",
    english:
      "One who sees the Supreme Lord dwelling equally in all beings, the imperishable within the perishable — that one truly sees.",
  },

  // ── CHAPTER 14 ──
  {
    chapter: 14,
    verse: 5,
    sanskrit:
      "सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः |\nनिबध्नन्ति महाबाहो देहे देहिनमव्ययम् ॥",
    transliteration:
      "sattvaṃ rajas tama iti guṇāḥ prakṛti-sambhavāḥ |\nnibadhnanti mahābāho dehe dehinam avyayam",
    hindi:
      "हे महाबाहो! सत्त्व, रज और तम — ये प्रकृति से उत्पन्न तीन गुण अविनाशी आत्मा को शरीर में बाँधते हैं।",
    english:
      "O mighty-armed, the three modes of material nature — goodness, passion, and ignorance — bind the eternal soul to the body.",
  },
  {
    chapter: 14,
    verse: 6,
    sanskrit: "तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम् |\nसुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ ॥",
    transliteration:
      "tatra sattvaṃ nirmalatvāt prakāśakam anāmayam |\nsukha-saṅgena badhnāti jñāna-saṅgena cānagha",
    hindi:
      "हे निष्पाप! इनमें सत्त्वगुण निर्मल होने से प्रकाशक और निरामय है, लेकिन यह सुख की आसक्ति और ज्ञान की आसक्ति से बाँधता है।",
    english:
      "O sinless one, the mode of goodness, being purer than the others, is illuminating and free from all sinful reactions. Those situated in it become conditioned by attachment to happiness and knowledge.",
  },
  {
    chapter: 14,
    verse: 17,
    sanskrit:
      "सत्त्वात्सञ्जायते ज्ञानं रजसो लोभ एव च |\nप्रमादमोहौ तमसो भवतोऽज्ञानमेव च ॥",
    transliteration:
      "sattvāt sañjāyate jñānaṃ rajaso lobha eva ca |\npramāda-mohau tamaso bhavato 'jñānam eva ca",
    hindi:
      "सत्त्व से ज्ञान उत्पन्न होता है, रज से लोभ, और तम से प्रमाद, मोह और अज्ञान उत्पन्न होते हैं।",
    english:
      "From the mode of goodness, wisdom develops; from the mode of passion, greed develops; and from the mode of ignorance, folly, madness, and illusion develop.",
  },
  {
    chapter: 14,
    verse: 20,
    sanskrit: "गुणानेतानतीत्य त्रीन्देही देहसमुद्भवान् |\nजन्ममृत्युजरादुःखैर्विमुक्तोऽमृतमश्नुते ॥",
    transliteration:
      "guṇān etān atītya trīn dehī deha-samudbhavān |\njanma-mṛtyu-jarā-duḥkhair vimukto 'mṛtam aśnute",
    hindi:
      "देही इन तीन गुणों को पार करके जन्म, मृत्यु, वृद्धावस्था और दुःख से मुक्त होकर अमृत का अनुभव करता है।",
    english:
      "When the soul transcends these three modes born of the body, it is freed from birth, death, old age, and their distresses and can enjoy nectar even in this life.",
  },
  {
    chapter: 14,
    verse: 26,
    sanskrit: "मां च योऽव्यभिचारेण भक्तियोगेन सेवते |\nस गुणान्समतीत्यैतान्ब्रह्मभूयाय कल्पते ॥",
    transliteration:
      "māṃ ca yo 'vyabhicāreṇa bhakti-yogena sevate |\nsa guṇān samatītyaitān brahma-bhūyāya kalpate",
    hindi:
      "जो पुरुष अव्यभिचारिणी भक्तियोग से मेरी सेवा करता है, वह इन तीनों गुणों को पार करके ब्रह्म बनने का अधिकारी हो जाता है।",
    english:
      "One who engages in full devotional service, unwavering in all circumstances, at once transcends the modes of material nature and thus comes to the level of Brahman.",
  },

  // ── CHAPTER 15 ──
  {
    chapter: 15,
    verse: 1,
    sanskrit:
      "श्रीभगवानुवाच |\nऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम् |\nछन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित् ॥",
    transliteration:
      "śrī bhagavān uvāca |\nūrdhva-mūlam adhaḥ-śākham aśvatthaṃ prāhur avyayam |\nchandāṃsi yasya parṇāni yas taṃ veda sa veda-vit",
    hindi:
      "श्रीभगवान् बोले — जिसकी जड़ें ऊपर और शाखाएं नीचे हैं, उस अविनाशी अश्वत्थ वृक्ष (संसार) की बात कही जाती है। जिसकी पत्तियाँ छंद (वेद) हैं, उसे जानने वाला वेदवेत्ता है।",
    english:
      "The Blessed Lord said: The sacred fig tree (of material existence) has its roots above and branches below. Its leaves are the Vedic hymns. One who knows this tree is the knower of the Vedas.",
  },
  {
    chapter: 15,
    verse: 5,
    sanskrit:
      "निर्मानमोहा जितसङ्गदोषा अध्यात्मनित्या विनिवृत्तकामाः |\nद्वन्द्वैर्विमुक्ताः सुखदुःखसंज्ञैर्गच्छन्त्यमूढाः पदमव्ययं तत् ॥",
    transliteration:
      "nirmāna-mohā jita-saṅga-doṣā adhyātma-nityā vinivṛtta-kāmāḥ |\ndvandvair vimuktāḥ sukha-duḥkha-saṃjñair gacchanty amūḍhāḥ padam avyayaṃ tat",
    hindi:
      "जो मान-मोह से रहित हैं, जिन्होंने आसक्ति के दोष को जीत लिया है, जो नित्य अध्यात्म में लगे हैं, जिनकी कामनाएं नष्ट हैं, सुख-दुःख के द्वंद्वों से मुक्त हैं — वे मूढ़ नहीं वे उस अव्यय पद को प्राप्त होते हैं।",
    english:
      "Those who are free from illusion and pride, who have conquered the evil of association, who are devoted to the spiritual, who are free from desire, freed from the dualities of pleasure and pain — the undeluded reach that eternal goal.",
  },
  {
    chapter: 15,
    verse: 7,
    sanskrit:
      "ममैवांशो जीवलोके जीवभूतः सनातनः |\nमनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ॥",
    transliteration:
      "mamaivāṃśo jīva-loke jīva-bhūtaḥ sanātanaḥ |\nmanaḥ-ṣaṣṭhānīndriyāṇi prakṛti-sthāni karṣati",
    hindi:
      "इस जीव-लोक में मेरा ही सनातन अंश जीव बना है, जो प्रकृति में स्थित मन सहित छः इंद्रियों को आकर्षित करता है।",
    english:
      "The living entities are My eternal fragmental parts. Due to conditioned life, they are struggling with the six senses, which include the mind.",
  },
  {
    chapter: 15,
    verse: 15,
    sanskrit:
      "सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च |\nवेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् ॥",
    transliteration:
      "sarvasya cāhaṃ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṃ ca |\nvedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham",
    hindi:
      "मैं सबके हृदय में स्थित हूँ। मुझसे ही स्मृति, ज्ञान और अपोहन होते हैं। समस्त वेदों द्वारा मैं ही जानने योग्य हूँ, वेदांत का कर्ता और वेद का जानने वाला भी मैं ही हूँ।",
    english:
      "I am seated in everyone's heart, and from Me come remembrance, knowledge, and forgetfulness. By all the Vedas, I am to be known. I am the author of Vedanta and I am the knower of the Vedas.",
    isFamous: true,
    famousTag: "सर्वहृदयस्थ",
  },

  // ── CHAPTER 16 ──
  {
    chapter: 16,
    verse: 1,
    sanskrit:
      "श्रीभगवानुवाच |\nअभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः |\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् ॥",
    transliteration:
      "śrī bhagavān uvāca |\nabhayaṃ sattva-saṃśuddhir jñāna-yoga-vyavasthitiḥ |\ndānaṃ damaś ca yajñaś ca svādhyāyas tapa ārjavam",
    hindi:
      "श्रीभगवान् बोले — अभय, सत्त्वशुद्धि, ज्ञानयोग में स्थिति, दान, दम, यज्ञ, स्वाध्याय, तप और सरलता।",
    english:
      "The Blessed Lord said: Fearlessness, purification of one's existence, cultivation of spiritual knowledge, charity, self-control, sacrifice, Vedic study, austerity, and simplicity.",
    isFamous: true,
    famousTag: "दैवी संपत्ति",
  },
  {
    chapter: 16,
    verse: 3,
    sanskrit:
      "तेजः क्षमा धृतिः शौचमद्रोहो नातिमानिता |\nभवन्ति सम्पदं दैवीमभिजातस्य भारत ॥",
    transliteration:
      "tejaḥ kṣamā dhṛtiḥ śaucam adroho nāti-mānitā |\nbhavanti sampadaṃ daivīm abhijātasya bhārata",
    hindi:
      "तेज, क्षमा, धैर्य, शौच, अद्रोह और अत्यधिक मान न करना — ये दैवी संपत् में उत्पन्न पुरुष के गुण हैं।",
    english:
      "Strength, forgiveness, fortitude, cleanliness, absence of envy, and absence of excessive pride — these are the divine qualities of one born with divine tendencies.",
  },
  {
    chapter: 16,
    verse: 21,
    sanskrit:
      "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः |\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् ॥",
    transliteration:
      "tri-vidhaṃ narakasyedaṃ dvāraṃ nāśanam ātmanaḥ |\nkāmaḥ krodhas tathā lobhas tasmād etat trayaṃ tyajet",
    hindi:
      "काम, क्रोध और लोभ — ये तीन नरक के द्वार आत्मा का नाश करने वाले हैं। इसलिए इन तीनों को त्याग देना चाहिए।",
    english:
      "Lust, anger, and greed — these are the three gates leading to hell, destructive of the soul. Therefore one must give up all three.",
    isFamous: true,
    famousTag: "नरक के तीन द्वार",
  },
  {
    chapter: 16,
    verse: 24,
    sanskrit:
      "तस्माच्छास्त्रं प्रमाणं ते कार्याकार्यव्यवस्थितौ |\nज्ञात्वा शास्त्रविधानोक्तं कर्म कर्तुमिहार्हसि ॥",
    transliteration:
      "tasmāc chāstraṃ pramāṇaṃ te kāryākārya-vyavasthitau |\njñātvā śāstra-vidhānoktaṃ karma kartum ihārhasi",
    hindi:
      "इसलिए तेरे लिए शास्त्र ही कार्य-अकार्य की व्यवस्था में प्रमाण है। शास्त्रीय विधि-विधान को जानकर तुझे इहलोक में कर्म करना चाहिए।",
    english:
      "Let scripture be your authority in determining what should be done and what should not be done. Having understood the scriptural injunctions, you should act accordingly.",
  },

  // ── CHAPTER 17 ──
  {
    chapter: 17,
    verse: 3,
    sanskrit:
      "सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत |\nश्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः ॥",
    transliteration:
      "sattvānurūpā sarvasya śraddhā bhavati bhārata |\nśraddhā-mayo 'yaṃ puruṣo yo yac-chraddhaḥ sa eva saḥ",
    hindi:
      "हे भारत! सबकी श्रद्धा उनके अंतःकरण के अनुसार होती है। यह पुरुष श्रद्धामय है — जो जैसी श्रद्धा रखता है, वह वैसा ही है।",
    english:
      "O Bharata, the faith of each person is in accordance with their nature. One is made of faith — whatever one's faith is, that is what they are.",
  },
  {
    chapter: 17,
    verse: 14,
    sanskrit: "देवद्विजगुरुप्राज्ञपूजनं शौचमार्जवम् |\nब्रह्मचर्यमहिंसा च शारीरं तप उच्यते ॥",
    transliteration:
      "deva-dvija-guru-prājña-pūjanaṃ śaucam ārjavam |\nbrahmacaryam ahiṃsā ca śārīraṃ tapa ucyate",
    hindi:
      "देवता, द्विज, गुरु और ज्ञानियों का पूजन, शुचिता, सरलता, ब्रह्मचर्य और अहिंसा — यही शारीरिक तप कहलाता है।",
    english:
      "Worship of the gods, the twice-born, the teachers and the wise; cleanliness, simplicity, celibacy and non-violence — these are said to be the austerities of the body.",
  },
  {
    chapter: 17,
    verse: 20,
    sanskrit:
      "दातव्यमिति यद्दानं दीयतेऽनुपकारिणे |\nदेशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम् ॥",
    transliteration:
      "dātavyam iti yad dānaṃ dīyate 'nupakāriṇe |\ndeśe kāle ca pātre ca tad dānaṃ sāttvikaṃ smṛtam",
    hindi:
      "जो दान 'देना चाहिए' — इस भाव से बिना उपकार की अपेक्षा रखे, योग्य देश, काल और पात्र को दिया जाता है, वह सात्त्विक दान है।",
    english:
      "Charity given out of duty, without expectation of return, at the proper time and place, and to a worthy person, is considered sattvic (in the mode of goodness).",
  },
  {
    chapter: 17,
    verse: 23,
    sanskrit:
      "ॐ तत्सदिति निर्देशो ब्रह्मणस्त्रिविधः स्मृतः |\nब्राह्मणास्तेन वेदाश्च यज्ञाश्च विहिताः पुरा ॥",
    transliteration:
      "oṃ tat sad iti nirdeśo brahmaṇas tri-vidhaḥ smṛtaḥ |\nbrāhmaṇās tena vedāś ca yajñāś ca vihitāḥ purā",
    hindi:
      "ॐ, तत्, सत् — यह ब्रह्म का त्रिविध निर्देशन है। इसी से प्राचीन काल में ब्राह्मण, वेद और यज्ञ विहित किए गए।",
    english:
      "Om, Tat, Sat — these three words represent Brahman. By them were the brahmins, the Vedas, and the sacrificial rituals established in ancient times.",
  },
  {
    chapter: 17,
    verse: 28,
    sanskrit:
      "अश्रद्धया हुतं दत्तं तपस्तप्तं कृतं च यत् |\nअसदित्युच्यते पार्थ न च तत्प्रेत्य नो इह ॥",
    transliteration:
      "aśraddhayā hutaṃ dattaṃ tapas taptaṃ kṛtaṃ ca yat |\nasad ity ucyate pārtha na ca tat pretya no iha",
    hindi:
      "हे पार्थ! बिना श्रद्धा के हवन, दान, तप और जो भी किया जाता है — वह 'असत्' कहलाता है। वह न इस लोक में काम आता है न परलोक में।",
    english:
      "O Partha, whatever is sacrificed, given, or performed, and whatever austerity is practiced without faith — it is called 'asat' (unreal). It is of no value here or in the next life.",
  },

  // ── CHAPTER 18 ──
  {
    chapter: 18,
    verse: 41,
    sanskrit:
      "ब्राह्मणक्षत्रियविशां शूद्राणां च परंतप |\nकर्माणि प्रविभक्तानि स्वभावप्रभवैर्गुणैः ॥",
    transliteration:
      "brāhmaṇa-kṣatriya-viśāṃ śūdrāṇāṃ ca paraṃtapa |\nkarmāṇi pravibhaktāni svabhāva-prabhavair guṇaiḥ",
    hindi:
      "हे परंतप! ब्राह्मण, क्षत्रिय, वैश्य और शूद्र के कर्म अपने-अपने स्वभाव से उत्पन्न गुणों के आधार पर विभाजित किए गए हैं।",
    english:
      "O Parantapa, the activities of brahmins, kshatriyas, vaishyas, and shudras are divided according to the qualities born of their own nature.",
  },
  {
    chapter: 18,
    verse: 45,
    sanskrit:
      "स्वे स्वे कर्मण्यभिरतः संसिद्धिं लभते नरः |\nस्वकर्मनिरतः सिद्धिं यथा विन्दति तच्छृणु ॥",
    transliteration:
      "sve sve karmaṇy abhirataḥ saṃsiddhiṃ labhate naraḥ |\nsva-karma-nirataḥ siddhiṃ yathā vindati tac chṛṇu",
    hindi:
      "अपने-अपने कर्म में लगा हुआ मनुष्य सिद्धि को प्राप्त होता है। अपने कर्म में लगे हुए पुरुष को कैसे सिद्धि मिलती है — वह सुन।",
    english:
      "One who is devoted to their own duty can attain perfection. Hear how one engaged in their own work finds that perfection.",
  },
  {
    chapter: 18,
    verse: 63,
    sanskrit: "इति ते ज्ञानमाख्यातं गुह्याद्गुह्यतरं मया |\nविमृश्यैतदशेषेण यथेच्छसि तथा कुरु ॥",
    transliteration:
      "iti te jñānam ākhyātaṃ guhyād guhyataraṃ mayā |\nvimṛśyaitad aśeṣeṇa yathecchasi tathā kuru",
    hindi:
      "इस प्रकार मैंने तुझे गोपनीय से भी गोपनीयतर ज्ञान बताया। इसे पूर्णतः सोचकर फिर जैसी तेरी इच्छा हो, वैसा कर।",
    english:
      "Thus I have explained to you the most confidential of all knowledge. Deliberate on this fully and then do as you wish.",
  },
  {
    chapter: 18,
    verse: 65,
    sanskrit:
      "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु |\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे ॥",
    transliteration:
      "man-manā bhava mad-bhakto mad-yājī māṃ namaskuru |\nmām evaiṣyasi satyaṃ te pratijāne priyo 'si me",
    hindi:
      "मुझमें मन लगा, मेरा भक्त बन, मेरा पूजन कर और मुझे प्रणाम कर। तू मुझे ही प्राप्त होगा — मैं सत्य प्रतिज्ञा करता हूँ, तू मेरा प्रिय है।",
    english:
      "Always think of Me, be devoted to Me, worship Me and bow down to Me. So shall you come to Me — I promise you truly, for you are dear to Me.",
    isFamous: true,
    famousTag: "कृष्ण का प्रेमपूर्ण वचन",
  },
  {
    chapter: 18,
    verse: 66,
    sanskrit:
      "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज |\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥",
    transliteration:
      "sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja |\nahaṃ tvāṃ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
    hindi:
      "सभी धर्मों को त्यागकर केवल मेरी शरण में आ। मैं तुझे सभी पापों से मुक्त कर दूंगा — शोक मत कर।",
    english:
      "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    isFamous: true,
    famousTag: "चरम श्लोक — परम शरणागति",
  },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────

export const famousVerses = gitaVerses.filter((v) => v.isFamous);

export function getChapterVerses(chapterNum: number): GitaVerse[] {
  return gitaVerses.filter((v) => v.chapter === chapterNum);
}

export function searchVerses(query: string, chapter?: number): GitaVerse[] {
  const q = query.trim().toLowerCase();
  if (!q && !chapter) return gitaVerses;
  return gitaVerses.filter((v) => {
    const matchesChapter = !chapter || v.chapter === chapter;
    if (!q) return matchesChapter;
    const matchesText =
      v.sanskrit.toLowerCase().includes(q) ||
      v.hindi.toLowerCase().includes(q) ||
      v.english.toLowerCase().includes(q) ||
      v.transliteration.toLowerCase().includes(q) ||
      `${v.chapter}.${v.verse}`.includes(q);
    return matchesChapter && matchesText;
  });
}
