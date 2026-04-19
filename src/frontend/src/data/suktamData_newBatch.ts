export interface SuktamEntryExtended {
  id: string;
  name: string;
  nameHindi: string;
  deity: string;
  deityHindi: string;
  vedaSource: string;
  shortDescription: string;
  benefits: string[];
  transliteration: string;
  totalMantras: number;
  fullText: string;
  meaning: string;
  alphabetGroup: "अ-ध" | "न-भ" | "भ-व" | "व-ह";
}

export const ALL_SUKTAMS: SuktamEntryExtended[] = [
  // ── GROUP "अ-ध" ──────────────────────────────────────────────────────────
  {
    id: "agni",
    name: "Agni Suktam",
    nameHindi: "अग्नि सूक्तम्",
    deity: "Agni",
    deityHindi: "अग्नि देव",
    vedaSource: "Rigveda 1.1",
    totalMantras: 9,
    alphabetGroup: "अ-ध",
    shortDescription: "ऋग्वेद का प्रथम सूक्त। अग्नि देव की स्तुति।",
    benefits: ["यज्ञ में सफलता", "घर में शांति", "पापों का नाश", "मनोकामना पूर्ति"],
    fullText:
      "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् ।\nहोतारं रत्नधातमम् ॥\nअग्निः पूर्वेभिर्ऋषिभिरीड्यो नूतनैरुत ।\nस देवाँ एह वक्षति ॥\nअग्निना रयिमश्नवत् पोषमेव दिवेदिवे ।\nयशसं वीरवत्तमम् ॥",
    transliteration:
      "agnimīḷe purohitaṃ yajñasya devamṛtvijam |\nhotāraṃ ratnadhātamam ||\nagniḥ pūrvebhirṛṣibhirīḍyo nūtanairuta |\nsa devāṃ eha vakṣati ||\nagnina rayimaśnavat poṣameva divedive |\nyaśasaṃ vīravattamam ||",
    meaning:
      "I worship Agni, the divine priest, the god of sacrifice, the invoker who bestows treasures. Agni, praised by ancient and new sages, shall bring the gods here. Through Agni one may win wealth daily, the most glorious wealth, full of heroism.",
  },
  {
    id: "ano-bhadra",
    name: "Ano Bhadra Suktam",
    nameHindi: "आनो भद्रः सूक्तम्",
    deity: "Universal Peace",
    deityHindi: "विश्वशांति",
    vedaSource: "Rigveda 1.89",
    totalMantras: 10,
    alphabetGroup: "अ-ध",
    shortDescription:
      "सर्वमंगल और शांति की प्रार्थना। विश्व के सभी दिशाओं से शुभ विचार आएं।",
    benefits: ["मन में शांति", "सकारात्मक ऊर्जा", "विश्व शांति", "बुद्धि का विकास"],
    fullText:
      "आ नो भद्राः क्रतवो यन्तु विश्वतोऽदब्धासो अपरीतास उद्भिदः ।\nदेवा नो यथा सदमिद् वृधे असन्नप्रायुवो रक्षितारो दिवेदिवे ॥\nविश्वे देवासो अपतुरो यथा नो यश्च शुम्भति ।\nसुदक्षा दक्षपितरो भवन्तु ॥",
    transliteration:
      "ā no bhadrāḥ kratavo yantu viśvato'dabdhāso aparītāsa udbhidaḥ |\ndevā no yathā sadamid vṛdhe asannaprāyuvo rakṣitāro divedive ||\nviśve devāso apaturo yathā no yaśca śumbhati |\nsudakṣā dakṣapitaro bhavantu ||",
    meaning:
      "Let noble thoughts come to us from all directions, unbounded and illuminating. May the gods, ever protecting us day after day without end, ever increase our strength. May all the divine powers protect us.",
  },
  {
    id: "indra",
    name: "Indra Suktam",
    nameHindi: "इंद्र सूक्तम्",
    deity: "Indra",
    deityHindi: "इंद्र देव",
    vedaSource: "Rigveda 2.12",
    totalMantras: 15,
    alphabetGroup: "अ-ध",
    shortDescription: "इंद्र देव की महिमा का वर्णन। वर्षा और समृद्धि के देवता की स्तुति।",
    benefits: ["शत्रु नाश", "वर्षा की प्राप्ति", "शक्ति और साहस", "जय-विजय"],
    fullText:
      "यो जात एव प्रथमो मनस्वान्देवो देवान् क्रतुना पर्यभूषत् ।\nयस्य शुष्माद् रोदसी अभ्यसेतां नृम्णस्य महिना स जनास इन्द्रः ॥\nयः पृथिवीं व्यथमानामदृंहद् यः पर्वतान् प्रकुपितानरम्णात् ।\nयो अन्तरिक्षं विममे वरीयो यः द्यामस्तभ्नात् स जनास इन्द्रः ॥",
    transliteration:
      "yo jāta eva prathamo manasvāndevā devān kratunā paryabhūṣat |\nyasya śuṣmād rodasī abhyasetāṃ nṛmṇasya mahinā sa janāsa indraḥ ||\nyaḥ pṛthivīṃ vyathamānāmadṛṃhad yaḥ parvatān prakupitānaraṃṇāt |\nyo antarikshaṃ vimame varīyo yaḥ dyāmastabhnāt sa janāsa indraḥ ||",
    meaning:
      "He who, born first, was foremost in mind and surpassed the gods in might — by whose strength heaven and earth trembled — he, O people, is Indra! He who steadied the quaking earth, who calmed the agitated mountains, who measured out the wider space of mid-air and established heaven — he, O people, is Indra!",
  },
  {
    id: "uttara-narayan",
    name: "Uttara Narayana Anuvak",
    nameHindi: "उत्तरनारायण अनुवाक",
    deity: "Narayana",
    deityHindi: "नारायण",
    vedaSource: "Yajurveda",
    totalMantras: 12,
    alphabetGroup: "अ-ध",
    shortDescription: "नारायण की परम सत्ता का वर्णन। ब्रह्म के स्वरूप की उपासना।",
    benefits: ["मोक्ष की प्राप्ति", "आत्मज्ञान", "सर्वपापों से मुक्ति", "ईश्वर कृपा"],
    fullText:
      "ऋतं सत्यं परं ब्रह्म पुरुषं कृष्णपिङ्गलम् ।\nऊर्ध्वरेतं विरूपाक्षं विश्वरूपाय वै नमः ॥\nनारायणाय विद्महे वासुदेवाय धीमहि ।\nतन्नो विष्णुः प्रचोदयात् ॥\nओं शान्तिः शान्तिः शान्तिः ॥",
    transliteration:
      "ṛtaṃ satyaṃ paraṃ brahma puruṣaṃ kṛṣṇapiṅgalam |\nūrdhvaretaṃ virūpākṣaṃ viśvarūpāya vai namaḥ ||\nnārāyaṇāya vidmahe vāsudevāya dhīmahi |\ntanno viṣṇuḥ pracodayāt ||\noṃ śāntiḥ śāntiḥ śāntiḥ ||",
    meaning:
      "I bow to the supreme cosmic truth, the eternal being, Narayana, of dark-golden complexion, with universal form. May we contemplate on Narayana, meditate on Vasudeva, and may that Vishnu illuminate our intellect. Om, Peace, Peace, Peace.",
  },
  {
    id: "kumar",
    name: "Kumar Suktam",
    nameHindi: "कुमार सूक्तम्",
    deity: "Skanda/Kartikeya",
    deityHindi: "कार्तिकेय/स्कंद",
    vedaSource: "Atharvaveda",
    totalMantras: 8,
    alphabetGroup: "अ-ध",
    shortDescription: "स्कंद/कार्तिकेय की स्तुति। युद्ध और विजय के देवता की प्रार्थना।",
    benefits: ["विजय की प्राप्ति", "बच्चों की रक्षा", "शत्रु नाश", "बल और पराक्रम"],
    fullText:
      "यो जातः प्रथमः पुरा देवानाम् मुखे हव्यम् ।\nसः इन्द्राग्नी सोमं पिबतु ॥\nकुमार षण्मुख देव शरवण भव ।\nविघ्नहर्ता सिद्धिदाता प्रभो नमस्ते ॥",
    transliteration:
      "yo jātaḥ prathamaḥ purā devānām mukhe havyam |\nsaḥ indrāgnī somaṃ pibatu ||\nkumāra ṣaṇmukha deva śaravaṇa bhava |\nvighnahartā siddhidātā prabho namaste ||",
    meaning:
      "He who was born first among the gods and receives the sacred offerings — let him drink with Indra, Agni, and Soma. O Kumara, the six-faced divine son of Shiva, born in the reeds, remover of obstacles and bestower of accomplishments, I bow to you.",
  },
  {
    id: "gau",
    name: "Gau Suktam",
    nameHindi: "गौ सूक्तम्",
    deity: "Kamadhenu",
    deityHindi: "कामधेनु/गौ माता",
    vedaSource: "Rigveda 6.28",
    totalMantras: 8,
    alphabetGroup: "अ-ध",
    shortDescription:
      "पवित्र गाय कामधेनु की स्तुति। गौ माता को ब्रह्मांड की माता माना गया है।",
    benefits: ["समृद्धि", "पुण्य प्राप्ति", "घर में सुख-शांति", "गाय की रक्षा का पुण्य"],
    fullText:
      "आ गावो अग्मन्नुत भद्रमक्रन् सीदन्तु गोष्ठे रणयन्त्वस्मे ।\nप्रजावतीः पुरुरूपा इह स्युरिन्द्राय पूर्वीरुषसो दुहानाः ॥\nइन्द्रो यज्वने पृणते च शिक्षत्युपेद्दद्यान्न उपयन्तु वाजाः ।\nभूयोभूयो रयिमिदस्य वर्धयन्नभिन्ने खिल्ये नि दधाति देवयुम् ॥",
    transliteration:
      "ā gāvo agmannuta bhadramakran sīdantu goṣṭhe raṇayantvAsme |\nprajāvatīḥ pururūpā iha syurIndrāya pūrvīruṣaso duhānāḥ ||\nindro yajvane pṛṇate ca śikṣatyuped dadyān na upayanti vājāḥ |\nbhūyobhūyo rayimidAsya vardhayanAbhinne khilye ni dadhāti devayum ||",
    meaning:
      "The cows have come and brought good fortune; let them rest in the cowshed and rejoice with us. Let them be here in plenty, of many forms, yielding milk at early dawn for Indra. Indra teaches the sacrificer who gives; let the food-rewards come to us. May he ever increase his wealth and make the devout man thrive.",
  },
  {
    id: "gosht",
    name: "Gosht Suktam",
    nameHindi: "गोष्ट सूक्तम्",
    deity: "Cattle/Prosperity",
    deityHindi: "पशुधन/समृद्धि",
    vedaSource: "Atharvaveda 3.14",
    totalMantras: 6,
    alphabetGroup: "अ-ध",
    shortDescription: "पशुधन और समृद्धि की प्रार्थना। गोशाला की रक्षा और वृद्धि के लिए।",
    benefits: ["पशुधन वृद्धि", "व्यापार में लाभ", "आर्थिक समृद्धि", "घर की रक्षा"],
    fullText:
      "गोष्ठे धेनुं घृतमक्षरन्तीम् पयस्वतीं तस्थिवांसं शतायुम् ।\nत्वामद्य वसुधाने जुहोमि पोषाय गोशालायाः ॥\nआयन्तु गावः प्रतरन्तु नो गृहान् आयन्तु माता उत नः पिता च ।\nआयन्तु वाजाः पुरुमेधसो नः ॥",
    transliteration:
      "goṣṭhe dhenuṃ ghṛtamaksharantīm payasvatīṃ tasthivāṃsaṃ śatāyum |\ntvāmadya vasudhāne juhomi poṣāya goślāyāḥ ||\nāyantu gāvaḥ pratarantu no gṛhān āyantu mātā uta naḥ pitā ca |\nāyantu vājāḥ purumEdhaso naḥ ||",
    meaning:
      "In the cowshed the milk-giving cow flows with ghee — long-lived and nourishing. O Earth-goddess, I offer this oblation for the prosperity of the cattle-pen. May the cows come to our homes and thrive; may the mothers and fathers come; may strength and wisdom come to us.",
  },
  {
    id: "tantrokat-devi",
    name: "Tantrokat Devi Suktam",
    nameHindi: "तंत्रोक्त देवी सूक्तम्",
    deity: "Devi/Shakti",
    deityHindi: "देवी शक्ति",
    vedaSource: "Tantric Texts",
    totalMantras: 10,
    alphabetGroup: "अ-ध",
    shortDescription: "देवी शक्ति की तांत्रिक स्तुति। दुर्गा सप्तशती से उद्धृत।",
    benefits: ["देवी कृपा", "शत्रु नाश", "मनोकामना पूर्ति", "सभी बाधाओं का नाश"],
    fullText:
      "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता ।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥\nया देवी सर्वभूतेषु विद्यारूपेण संस्थिता ।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥\nया देवी सर्वभूतेषु लक्ष्मीरूपेण संस्थिता ।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥",
    transliteration:
      "yā devī sarvabhūteṣu śaktirūpeṇa saṃsthitā |\nnamastasyai namastasyai namastasyai namo namaḥ ||\nyā devī sarvabhūteṣu vidyārūpeṇa saṃsthitā |\nnamastasyai namastasyai namastasyai namo namaḥ ||\nyā devī sarvabhūteṣu lakṣmīrūpeṇa saṃsthitā |\nnamastasyai namastasyai namastasyai namo namaḥ ||",
    meaning:
      "To the Goddess who dwells in all beings as power, salutations again and again. To the Goddess who dwells in all beings as knowledge, salutations again and again. To the Goddess who dwells in all beings as prosperity, salutations again and again.",
  },
  {
    id: "devi",
    name: "Devi Suktam",
    nameHindi: "देवी सूक्तम्",
    deity: "Devi/Vak",
    deityHindi: "देवी/वाक्",
    vedaSource: "Rigveda 10.125",
    totalMantras: 8,
    alphabetGroup: "अ-ध",
    shortDescription:
      "देवी के विश्वव्यापी स्वरूप का वर्णन। वाक् देवी की परम शक्ति की स्तुति।",
    benefits: ["आत्मशक्ति", "वाक् सिद्धि", "ज्ञान प्राप्ति", "देवी का आशीर्वाद"],
    fullText:
      "अहं रुद्रेभिर्वसुभिश्चराम्यहमादित्यैरुत विश्वदेवैः ।\nअहं मित्रावरुणोभा बिभर्म्यहमिन्द्राग्नी अहमश्विनोभा ॥\nअहं सोमं आनयामि तमसा सोमं सूर्यस्य ।\nदेवान् यज्ञान् कल्पयाम्यहम् ॥",
    transliteration:
      "ahaṃ rudrEbhirvAsubhiścarāmyahamādityairuta viśvadEvaiḥ |\nahaṃ mitrāvaruṇobhā bibharmyahamIndrāgnī ahamaśvInobhā ||\nahaṃ somam ānayāmi tamasā somaṃ sūryasya |\ndevān yajñān kalpayāmyaham ||",
    meaning:
      "I walk with the Rudras, Vasus, Adityas, and all gods. I bear Mitra and Varuna, Indra and Agni, the two Ashvins. I bring forth Soma and the light of the sun. I ordain the gods and the sacrifices.",
  },
  {
    id: "dhruva",
    name: "Dhruva Suktam",
    nameHindi: "ध्रुव सूक्तम्",
    deity: "Dhruva/Stability",
    deityHindi: "ध्रुव तारा/स्थिरता",
    vedaSource: "Atharvaveda",
    totalMantras: 7,
    alphabetGroup: "अ-ध",
    shortDescription:
      "ध्रुव तारे की स्थिरता की प्रार्थना। जीवन में स्थायित्व और दृढ़ता के लिए।",
    benefits: ["जीवन में स्थिरता", "दृढ़ निश्चय", "संकट में धैर्य", "परिवार की सुरक्षा"],
    fullText:
      "ध्रुवं ते राजा वरुणो ध्रुवं देवो बृहस्पतिः ।\nध्रुवं त इन्द्रश्चाग्निश्च राष्ट्रं धारयतां ध्रुवम् ॥\nध्रुवा द्यौर्ध्रुवा पृथिवी ध्रुवासः पर्वता इमे ।\nध्रुवं विश्वमिदं जगत् ध्रुवो राजा विशामयम् ॥",
    transliteration:
      "dhruvaṃ te rājā varuṇo dhruvaṃ devo bṛhaspatiḥ |\ndhruvaṃ ta indraśCāgniśca rāṣṭraṃ dhārayatāṃ dhruvam ||\ndhruvā dyaurDhruvā pṛthivī dhruvāsaḥ parvatā ime |\ndhruvaṃ viśvamIdaṃ jagat dhruvā rājā viśāmayam ||",
    meaning:
      "Firm is your king Varuna, firm is the divine Brihaspati. May Indra and Agni firmly uphold your kingdom. Firm is heaven, firm is earth, firm are these mountains. Firm is this whole world, firm is this king over the people.",
  },

  // ── GROUP "न-भ" ──────────────────────────────────────────────────────────
  {
    id: "narayana",
    name: "Narayana Suktam",
    nameHindi: "नारायण सूक्तम्",
    deity: "Vishnu/Narayana",
    deityHindi: "विष्णु/नारायण",
    vedaSource: "Yajurveda 31",
    totalMantras: 13,
    alphabetGroup: "न-भ",
    shortDescription: "परब्रह्म नारायण की स्तुति। विष्णु सहस्रनाम से भी अधिक फलदायी।",
    benefits: ["मोक्ष", "सर्वपाप नाश", "जीवन-मृत्यु के भय से मुक्ति", "विष्णु लोक प्राप्ति"],
    fullText:
      "सहस्रशीर्षं पुरुषं सहस्राक्षं सहस्रपात् ।\nस भूमिं विश्वतो वृत्वात्यतिष्ठद्दशाङ्गुलम् ॥\nपुरुष एवेदं सर्वं यद्भूतं यच्च भव्यम् ।\nउतामृतत्वस्येशानो यदन्नेनातिरोहति ॥\nनारायणाय विद्महे वासुदेवाय धीमहि ।\nतन्नो विष्णुः प्रचोदयात् ॥",
    transliteration:
      "sahasraśīrṣaṃ puruṣaṃ sahasrākṣaṃ sahasrapāt |\nsa bhūmiṃ viśvato vṛtvātyatiṣṭhaddaśāṅgulam ||\npuruṣa evedaṃ sarvaṃ yadbhūtaṃ yacca bhavyam |\nutāmṛtatvasyeśāno yadannEnātiROhati ||\nnārāyaṇāya vidmahe vāsudevāya dhīmahi |\ntanno viṣṇuḥ pracodayāt ||",
    meaning:
      "The cosmic being has a thousand heads, thousand eyes, thousand feet. He pervades the whole earth and stands beyond by ten fingers. This Purusha alone is all this — what has been and what will be. He is the lord of immortality. We know Narayana, we meditate on Vasudeva. May Vishnu illuminate our intellect.",
  },
  {
    id: "nasadiya",
    name: "Nasadiya Suktam",
    nameHindi: "नासदीय सूक्तम्",
    deity: "Universal Creation",
    deityHindi: "सृष्टि का रहस्य",
    vedaSource: "Rigveda 10.129",
    totalMantras: 7,
    alphabetGroup: "न-भ",
    shortDescription: "सृष्टि के रहस्य का वर्णन। 'नासदासीत्' — न सत् था न असत् था।",
    benefits: ["ज्ञान और विवेक", "ब्रह्म-चिंतन", "मन की गहराई", "आत्मदर्शन"],
    fullText:
      "नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् ।\nकिमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥\nको अद्धा वेद क इह प्र वोचत् कुत आजाता कुत इयं विसृष्टिः ।\nअर्वाग्देवा अस्य विसर्जनेनाथा को वेद यत आबभूव ॥",
    transliteration:
      "nāsadāsīnno sadāsīttadānīṃ nāsīdrajo no vyomā paro yat |\nkimāvarīvaḥ kuha kasya śarmanambhaḥ kimāsīdgahanaṃ gabhīram ||\nko addhā veda ka iha pra vocat kuta ājātā kuta iyaṃ visṛṣṭiḥ |\narvāgdevā asya visarjanenāthā ko veda yata ābabhūva ||",
    meaning:
      "Neither non-existence nor existence was there; neither the realm of space nor sky beyond. What stirred? Where? In whose protection? Was there water, unfathomably deep? Who really knows? Who will here proclaim it? Whence was it produced? Whence is this creation? The gods came afterwards with this creation — who then knows whence it has arisen?",
  },
  {
    id: "nila",
    name: "Nila Suktam",
    nameHindi: "नील सूक्तम्",
    deity: "Durga/Blue aspect",
    deityHindi: "नीला देवी/दुर्गा",
    vedaSource: "Yajurveda",
    totalMantras: 8,
    alphabetGroup: "न-भ",
    shortDescription: "देवी के नील/नीलकण्ठ स्वरूप की स्तुति।",
    benefits: ["कष्ट निवारण", "बुरी नजर से रक्षा", "नीले रंग की शुभता", "देवी कृपा"],
    fullText:
      "नीला रुद्रा शिवा तनूः तदस्य प्रिया तनूः ।\nनमो रुद्राय शिवाय ॥\nनीलग्रीव उत्तराधपताति वर्षमानाय भगवते रुद्राय ।\nनमः शिवाय शान्तम् ॥",
    transliteration:
      "nīlā rudrā śivā tanūḥ tadAsya priyā tanūḥ |\nnamo rudrāya śivāya ||\nnīlagrīva uttarādhapAtati varṣamāṇāya bhagavate rudrāya |\nnamaḥ śivāya śāntam ||",
    meaning:
      "The blue, auspicious form of Rudra is his beloved form. Salutation to Rudra, to Shiva. The blue-throated one who roams on high, to the blessed, rain-giving Rudra — salutations to Shiva, the peaceful one.",
  },
  {
    id: "parjanya",
    name: "Parjanya Suktam",
    nameHindi: "पर्जन्य सूक्तम्",
    deity: "Parjanya (Rain God)",
    deityHindi: "पर्जन्य/वर्षा देव",
    vedaSource: "Rigveda 5.83",
    totalMantras: 9,
    alphabetGroup: "न-भ",
    shortDescription:
      "वर्षा देव पर्जन्य की स्तुति। किसानों द्वारा वर्षा के लिए की जाने वाली प्रार्थना।",
    benefits: [
      "वर्षा की प्राप्ति",
      "कृषि में समृद्धि",
      "जल की प्रचुरता",
      "प्रकृति से सामंजस्य",
    ],
    fullText:
      "प्र वाता वान्ति पतयन्ति विद्युतः उप सृजन्ति महिनी अनु स्वनिम् ।\nसमुद्रियस्य स्तनयन्ति वृष्टयः पर्जन्यो भूमिमध्यावर्तते ॥\nसं वृष्टिभिः पर्जन्य तर्पयेमं प्रजाः पशून् वनस्पतीन् ।\nओषधीरन्तरिक्षं च सर्वं ॥",
    transliteration:
      "pra vātā vānti patayanti vidyutaḥ upa sṛjanti mahinī anu svanim |\nsamudriyasya stanayanti vṛṣṭayaḥ parjanyo bhūmimadhyāvartate ||\nsaṃ vṛṣṭibhiḥ parjanya tarpayemaṃ prajāḥ paśūn vanaspatīn |\noṣadhīrantarikshaṃ ca sarvaṃ ||",
    meaning:
      "The winds blow, the lightnings fly, the plants rise up following the sound. The rains thunder from the sea — Parjanya moves over the earth. With your rains, O Parjanya, satiate the people, animals, plants, herbs, the atmosphere, and all this world.",
  },
  {
    id: "pavamana",
    name: "Pavamana Suktam",
    nameHindi: "पवमान सूक्तम्",
    deity: "Soma/Purification",
    deityHindi: "सोम/पवित्रता",
    vedaSource: "Rigveda 9",
    totalMantras: 11,
    alphabetGroup: "न-भ",
    shortDescription: "सोम रस की शुद्धता का वर्णन। पवित्रता और आत्मशुद्धि के लिए।",
    benefits: ["मन की शुद्धि", "पाप नाश", "आत्मशुद्धि", "दिव्य अनुभव"],
    fullText:
      "परि त्यं हर्यतं हरिम् मृज्यते पवमानः ।\nयेन देवासो मदन्ति ॥\nपवमान ते असवः सं स्रवन्तु सोम ।\nविश्वं दधि पावक आयुर्विश्वायुरद्भुतः ॥\nपवस्व सोम मेधया देवान् आत्मानमिन्दवः ।\nदिवं जेषि महीमिषम् ॥",
    transliteration:
      "pari tyaṃ haryataṃ harim mṛjyate pavamānaḥ |\nyena devāso madanti ||\npavamāna te asavaḥ saṃ sravantu soma |\nviśvaṃ dadhi pāvaka āyurviśvāyuradBhutaḥ ||\npavaSva soma medhayā devān ātmānamIndavaḥ |\ndivaṃ jeṣi mahīmiṣam ||",
    meaning:
      "The flowing, beloved Soma is purified — through which the gods rejoice. O purifying Soma, may your streams flow together. O wonderful purifier, sustain all life and all vitality! O Soma, purify yourself with wisdom for the gods; conquer heaven and the great earth.",
  },
  {
    id: "pitr",
    name: "Pitr Suktam",
    nameHindi: "पितृ सूक्तम्",
    deity: "Pitru Devata (Ancestors)",
    deityHindi: "पितृ देवता",
    vedaSource: "Rigveda 10.14",
    totalMantras: 16,
    alphabetGroup: "न-भ",
    shortDescription:
      "पूर्वजों की आत्मा की शांति के लिए। श्राद्ध और तर्पण में विशेष उपयोगी।",
    benefits: [
      "पितृ दोष निवारण",
      "पूर्वजों का आशीर्वाद",
      "वंश वृद्धि",
      "मोक्ष की प्राप्ति",
    ],
    fullText:
      "परेयिवांसं प्रवतो महीरनु बहुभ्यः पन्थामनुपस्पशानम् ।\nवैवस्वतं संगमनं जनानां यमं राजानं हवसा दुवस्य ॥\nयमो नो गातुं प्रथमो विवेद नैषा गव्यूतिरपभर्तवा उ ।\nयत्रा नः पूर्वे पितरः परेयुरेना जज्ञानाः पथ्या अनु स्वाः ॥\nनमो वः पितरो रसाय नमो वः पितर आर्जुनाय ।\nनमो वः पितरो जीवाय ॥",
    transliteration:
      "pareyivāṃsaṃ pravato mahīranu bahubhyaḥ panthāmanupaspaśānam |\nvaivasvatāṃ saṃgamanaṃ janānāṃ yamaṃ rājānaṃ havasā duvasya ||\nyamo no gātuṃ prathamo viveda naiṣā gavyūtirapabharTavā u |\nyatrā naḥ pūrve pitaraḥ pareyurenā jajñānāḥ pathyā anu svāḥ ||\nnamo vaḥ pitaro rasāya namo vaḥ pitara ārjunāya |\nnamo vaḥ pitaro jīvāya ||",
    meaning:
      "Worship with oblations the king Yama, the son of Vivasvat, who was the first to travel the path for many — the gathering place of all people. Yama first found the path for us, and that road is not to be taken away — the path on which our forefathers departed. Homage to you, ancestors, for your essence, for your courage, for your life.",
  },
  {
    id: "purusha",
    name: "Purusha Suktam",
    nameHindi: "पुरुष सूक्तम्",
    deity: "Purusha (Cosmic Being)",
    deityHindi: "विराट पुरुष/ब्रह्म",
    vedaSource: "Rigveda 10.90",
    totalMantras: 16,
    alphabetGroup: "न-भ",
    shortDescription: "ब्रह्मांड के विराट पुरुष का वर्णन। सृष्टि की उत्पत्ति का दिव्य ग्रंथ।",
    benefits: ["ब्रह्म ज्ञान", "मोक्ष", "यज्ञ की सिद्धि", "सर्व कामना पूर्ति"],
    fullText:
      "सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात् ।\nस भूमिं विश्वतो वृत्वात्यतिष्ठद्दशाङ्गुलम् ॥\nपुरुष एवेदं सर्वं यद्भूतं यच्च भव्यम् ।\nउतामृतत्वस्येशानो यदन्नेनातिरोहति ॥\nतस्माद्यज्ञात्सर्वहुतः संभृतं पृषदाज्यम् ।\nपशून्ताँश्चक्रे वायव्यानारण्यान् ग्राम्याश्च ये ॥",
    transliteration:
      "sahasraśīrṣā puruṣaḥ sahasrākṣaḥ sahasrapāt |\nsa bhūmiṃ viśvato vṛtvātyatiṣṭhaddaśāṅgulam ||\npuruṣa evedaṃ sarvaṃ yadbhūtaṃ yacca bhavyam |\nutāmṛtatvasyeśāno yadannEnātiROhati ||\ntasmādyajñātsarvahutaḥ saṃbhṛtaṃ pṛṣadājyam |\npaśūntāṃścakre vāyavyānāraṇyān grāmyāśca ye ||",
    meaning:
      "The Cosmic Person has a thousand heads, thousand eyes, thousand feet. He pervades the earth on all sides and extends beyond by ten fingers. This Purusha alone is all that has been and all that will be. He is the lord of immortality. From that all-containing sacrifice was born the speckled butter; the creatures of the air were created, and wild and domestic animals.",
  },
  {
    id: "bagalamukhi",
    name: "Bagalamukhi Suktam",
    nameHindi: "बगलामुखी सूक्तम्",
    deity: "Bagalamukhi",
    deityHindi: "बगलामुखी माता",
    vedaSource: "Tantric Texts",
    totalMantras: 8,
    alphabetGroup: "न-भ",
    shortDescription: "माता बगलामुखी की स्तुति। शत्रु स्तम्भन और वाक् सिद्धि के लिए।",
    benefits: ["शत्रु स्तम्भन", "वाक् सिद्धि", "कोर्ट केस में जीत", "बुरी शक्तियों से रक्षा"],
    fullText:
      "ॐ ह्रीं बगलामुखि सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्वां कीलय कीलय ।\nबुद्धिं विनाशय ह्रीं ॐ स्वाहा ॥\nबगले पीताम्बरे देवि पीतपुष्पैः सुपूजिते ।\nनमामि त्वां बगलामुखि त्रैलोक्यविजये ॥",
    transliteration:
      "oṃ hrīṃ bagalāmukhi sarvāduṣṭānāṃ vācaṃ mukhaṃ padaṃ stambhaya jihvāṃ kīlaya kīlaya |\nbuddhiṃ vināśaya hrīṃ oṃ svāhā ||\nbagale pītāmbare devi pītapuṣpaiḥ supūjite |\nnAmāmi tvāṃ bagalāmukhi trailokyavijaye ||",
    meaning:
      "Om Hrim! O Bagalamukhi, paralyze the speech, mouth, and feet of all evil-doers. Pin the tongue, destroy the intellect of enemies. Hrim Om Svaha. O Bagala, wearing yellow garments, worshipped with yellow flowers, I bow to you, O Bagalamukhi, the conqueror of all three worlds.",
  },
  {
    id: "brahmanaspati",
    name: "Brahmanaspati Suktam",
    nameHindi: "ब्रह्मनास्पति सूक्तम्",
    deity: "Brihaspati/Ganesha",
    deityHindi: "बृहस्पति/गणपति",
    vedaSource: "Rigveda 2.23",
    totalMantras: 19,
    alphabetGroup: "न-भ",
    shortDescription: "बृहस्पति और गणपति की स्तुति। 'गणानां त्वा' — गणेश मंत्र का स्रोत।",
    benefits: [
      "विघ्नों का नाश",
      "विद्या प्राप्ति",
      "बुद्धि और विवेक",
      "शुभ कार्यों में सफलता",
    ],
    fullText:
      "गणानां त्वा गणपतिं हवामहे कविं कवीनामुपमश्रवस्तमम् ।\nज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत आ नः शृण्वन्नूतिभिः सीद सादनम् ॥\nयो वेदे देवानां नाम ब्रह्मणस्पतिः ।\nजयेत सहस्रसेनः स वाचमश्नुते ॥",
    transliteration:
      "gaṇānāṃ tvā gaṇapatiṃ havāmahe kaviṃ kavīnāmupamaśraVastamam |\njyeṣṭharājaṃ brahmaṇāṃ brahmaṇaspatā naḥ śṛṇvannūtibhiḥ sīda sādanam ||\nyo vede devānāṃ nāma brahmaṇaspatiḥ |\njayeta sahasraseNaḥ sa vācamaśnute ||",
    meaning:
      "We invoke you, O Ganapati, lord of all assemblies, the wisest of the wise, most worthy of praise. You are the eldest, the king of wisdom. O Brahmanaspati, hear us and take your seat in our assembly. He who knows the names of the gods — Brahmanaspati — achieves excellence of speech.",
  },
  {
    id: "bhagya",
    name: "Bhagya Suktam",
    nameHindi: "भाग्य सूक्तम्",
    deity: "Bhaga (Fortune)",
    deityHindi: "भग देव/भाग्य",
    vedaSource: "Atharvaveda",
    totalMantras: 9,
    alphabetGroup: "न-भ",
    shortDescription: "भाग्य देव भग की स्तुति। सौभाग्य और समृद्धि की प्राप्ति के लिए।",
    benefits: ["भाग्य वृद्धि", "सौभाग्य", "धन-सम्पत्ति", "जीवन में सफलता"],
    fullText:
      "भगस्य नाम्ना वयं देवस्य सवितुः प्रसवे ।\nसमुद्रं भगस्य नाम्ना राजा प्रदायात् ॥\nभगो देवः श्रेष्ठतमो भगः सूर्यस्य रश्मयः ।\nभगं वसुपते नमामि ॥",
    transliteration:
      "bhagasya nāmnā vayaṃ devasya savituḥ prasave |\nsamudraṃ bhagasya nāmnā rājā pradāyāt ||\nbhago devaḥ śreṣṭhatamo bhagaḥ sūryasya raśmayaḥ |\nbhagaṃ vasupate namāmi ||",
    meaning:
      "In the name of Bhaga, with the blessing of divine Savitar, may fortune come to us. In the name of Bhaga, may the king give to us like an ocean of abundance. Bhaga is the most excellent of gods; Bhaga is the rays of the sun. O lord of wealth, I bow to Bhaga, giver of fortune.",
  },

  // ── GROUP "भ-व" ──────────────────────────────────────────────────────────
  {
    id: "bhu",
    name: "Bhu Suktam",
    nameHindi: "भू सूक्तम्",
    deity: "Prithvi/Earth",
    deityHindi: "पृथ्वी माता",
    vedaSource: "Atharvaveda",
    totalMantras: 7,
    alphabetGroup: "भ-व",
    shortDescription: "पृथ्वी माता की संक्षिप्त स्तुति। भूमि देवी की कृपा के लिए।",
    benefits: [
      "भूमि की कृपा",
      "कृषि में सफलता",
      "माता का आशीर्वाद",
      "पर्यावरण की रक्षा",
    ],
    fullText:
      "भूमिर्माता पुत्रोऽहं पृथिव्याः ।\nपर्जन्यः पिता स उ नः पिपर्तु ॥\nधन्या भूमिः पुरुषार्थसाधना विश्वस्य माता ।\nनमः पृथिव्यै ॥",
    transliteration:
      "bhūmirmātā putro'haṃ pṛthivyāḥ |\nparjanyaḥ pitā sa u naḥ pipartu ||\nddhanyā bhūmiḥ puruṣārthasādhanā viśvasya mātā |\nnamaḥ pṛthivyai ||",
    meaning:
      "The Earth is my mother, I am the son of the Earth. Parjanya (the rain) is the father — may he nourish us. Blessed is the Earth, the means of achieving human goals, the mother of the universe. Salutation to the Earth.",
  },
  {
    id: "bhumi",
    name: "Bhumi Suktam",
    nameHindi: "भूमि सूक्तम्",
    deity: "Prithvi/Earth",
    deityHindi: "पृथ्वी देवी",
    vedaSource: "Atharvaveda 12.1",
    totalMantras: 63,
    alphabetGroup: "भ-व",
    shortDescription: "पृथ्वी देवी की विस्तृत स्तुति — सबसे लंबा सूक्त।",
    benefits: ["पृथ्वी का आशीर्वाद", "पर्यावरण सुरक्षा", "भूमि पूजन", "दीर्घायु"],
    fullText:
      "सत्यं बृहद्ऋतमुग्रं दीक्षा तपो ब्रह्म यज्ञः पृथिवीं धारयन्ति ।\nसा नो भूतस्य भव्यस्य पत्न्युरुं लोकं पृथिवी नः कृणोतु ॥\nअसंबाधं बध्यतो मानवानां यस्यामश्वा अभिहिताः ।\nतां त्वा पृथिवीं मातरम् ॥",
    transliteration:
      "satyaṃ bṛhadṛtamugraṃ dīkṣā tapo brahma yajñaḥ pṛthivīṃ dhārayanti |\nsā no bhūtasya bhavyasya patnyuruṃ lokaṃ pṛthivī naḥ kṛṇotu ||\nasaṃbādhaṃ badhyato mānavānāṃ yasyāmaśvā abhihitāḥ |\ntāṃ tvā pṛthivīṃ mātaram ||",
    meaning:
      "Truth, the great cosmic order, fervor, dedication, spiritual power, sacrifice — these uphold the Earth. She, the mistress of past and future, may the Earth make wide space for us. In her unbounded expanse where horses run free — that Earth I call my mother.",
  },
  {
    id: "manyu",
    name: "Manyu Suktam",
    nameHindi: "मन्यु सूक्तम्",
    deity: "Manyu (Righteous Anger)",
    deityHindi: "मन्यु/शक्ति",
    vedaSource: "Rigveda 10.83",
    totalMantras: 7,
    alphabetGroup: "भ-व",
    shortDescription:
      "वीरता और न्यायोचित क्रोध की शक्ति का वर्णन। शत्रुओं पर विजय के लिए।",
    benefits: ["शत्रु पर विजय", "साहस और वीरता", "अन्याय के विरुद्ध शक्ति", "सुरक्षा"],
    fullText:
      "यस्ते मन्यो अविधद्वज्र सायक सहो ओजो अभिभूते नृम्णम् ।\nतं त्वा हुवे सुते सोमे अर्वाञ्चं वृत्रहणं शत्रुहणम् ॥\nमन्युरिन्द्रो मन्युरेवास देवो मन्युर्होता वरुणो जातवेदाः ।\nमन्युं विशः सहसाऽहं प्रतिष्ठे ॥",
    transliteration:
      "yaste manyo avidhadvajra sāyaka saho ojo abhibhūte nṛmṇam |\ntaṃ tvā huve sute some arvāñcaṃ vṛtrahaNaṃ śatruhaNam ||\nmanyurIndro manyurevāsa devo manyurhotā varuṇo jātavedāḥ |\nmanyuṃ viśaḥ sahasā'haṃ pratiṣṭhe ||",
    meaning:
      "O Manyu, whose force wields the thunderbolt-shaft, whose power overwhelms enemies — him I invoke when Soma is pressed, the Vritra-slayer, the enemy-destroyer. Manyu is Indra, Manyu himself is the divine. I stand firm in my community with Manyu's strength.",
  },
  {
    id: "mritasanjivan",
    name: "Mritasanjivan Suktam",
    nameHindi: "मृतसंजीवन सूक्तम्",
    deity: "Healing/Revival",
    deityHindi: "शिव/मृत्युंजय",
    vedaSource: "Rigveda/Atharvaveda",
    totalMantras: 8,
    alphabetGroup: "भ-व",
    shortDescription: "मृत्युंजय मंत्र समेत — रोग और मृत्यु के भय से मुक्ति।",
    benefits: ["रोग मुक्ति", "दीर्घायु", "मृत्यु भय निवारण", "स्वास्थ्य लाभ"],
    fullText:
      "त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥\nये ते शतं हेमन्तासो ये ते सहस्रं हेमन्तासः ।\nतेभ्यो नमः कृणुम आयुर्दधानाः ॥\nमृत्यवे स्वाहा मृत्यवे स्वाहा ॥",
    transliteration:
      "tryambakaṃ yajāmahe sugandhaṃ puṣṭivardhanam |\nurvārukamiva bandhanān mṛtyormukṣīya mā'mṛtāt ||\nye te śataṃ hemantāso ye te sahasraṃ hemantāsaḥ |\ntebhyo namaḥ kṛṇuma āyurdadhānāḥ ||\nmṛtyave svāhā mṛtyave svāhā ||",
    meaning:
      "We worship the three-eyed one, fragrant, who nourishes all. Like a cucumber freed from its stalk, may he liberate us from death and not from immortality. To those hundred and thousand who have passed in winter — to them we bow, praying for long life. Svaha to death, svaha to death.",
  },
  {
    id: "medha",
    name: "Medha Suktam",
    nameHindi: "मेधा सूक्तम्",
    deity: "Saraswati/Intelligence",
    deityHindi: "सरस्वती/मेधा देवी",
    vedaSource: "Yajurveda",
    totalMantras: 10,
    alphabetGroup: "भ-व",
    shortDescription:
      "बुद्धि और मेधा शक्ति की देवी की स्तुति। विद्यार्थियों के लिए अत्यंत लाभकारी।",
    benefits: ["बुद्धि और स्मृति", "परीक्षा में सफलता", "विद्या प्राप्ति", "एकाग्रता"],
    fullText:
      "यां मेधां देवगणाः पितरश्चोपासते ।\nतया मामद्य मेधयाऽग्ने मेधाविनं कुरु ॥\nयया मेधया देवाः सहस्राक्षो बृहस्पतिः ।\nतया मेधयागे मेधाविनं कुरु ॥\nसरस्वती मे मेधां ददातु वरुणश्च राजा ।\nइन्द्रश्चाग्निश्च मेधां ॥",
    transliteration:
      "yāṃ medhāṃ devagaṇāḥ pitaraścopāsate |\ntayā māmadya medhayā'gne medhāvinaṃ kuru ||\nyayā medhayā devāḥ sahasrākṣo bṛhaspatiḥ |\ntayā medhayāgne medhāvinaṃ kuru ||\nsarasvatī me medhāṃ dadātu varuṇaśca rājā |\nindraśCāgniśca medhāṃ ||",
    meaning:
      "O Agni, with the wisdom worshipped by gods and ancestors, make me wise today with that wisdom. With that wisdom by which the gods, the thousand-eyed one, and Brihaspati are wise — O Agni, make me wise. May Saraswati, the king Varuna, Indra, and Agni give me wisdom and brilliance.",
  },
  {
    id: "ratri",
    name: "Ratri Suktam",
    nameHindi: "रात्रि सूक्तम्",
    deity: "Ratri (Night Goddess)",
    deityHindi: "रात्रि देवी",
    vedaSource: "Rigveda 10.127",
    totalMantras: 8,
    alphabetGroup: "भ-व",
    shortDescription: "रात्रि देवी की स्तुति — ब्रह्म मुहूर्त और रात्रि पूजन के लिए।",
    benefits: [
      "सुखद नींद",
      "बुरे स्वप्नों से मुक्ति",
      "रात्रि की सुरक्षा",
      "आध्यात्मिक जागृति",
    ],
    fullText:
      "रात्री व्यख्यदायती पुरुत्रा देव्यक्षभिः ।\nविश्वा अधि श्रियोऽधित ॥\nओर्वप्रा अमर्त्या निवतो देव्युद्वतः ।\nज्योतिषा बाधते तमः ॥\nनिरु स्वसारमस्कृतोषसं देव्यायती ।\nअपेदु हासते तमः ॥",
    transliteration:
      "rātrī vyakhadāyatī purutrā devyakṣabhiḥ |\nviśvā adhi śriyo'dhita ||\norvapā amartya niVato devyudvataḥ |\njyotiṣā bādhate tamaḥ ||\nniru svasāramasktOṣasaṃ devyāyatī |\nAped u hāsate tamaḥ ||",
    meaning:
      "The divine Night goddess who comes with her many eyes, has surveyed all glories. The immortal one pervades the depths and heights, driving away darkness with her light. As the approaching goddess dispels her sister, the Dawn — and darkness flees before her.",
  },
  {
    id: "rudra",
    name: "Rudra Suktam",
    nameHindi: "रुद्र सूक्तम्",
    deity: "Rudra/Shiva",
    deityHindi: "रुद्र/शिव",
    vedaSource: "Yajurveda 16",
    totalMantras: 18,
    alphabetGroup: "भ-व",
    shortDescription: "रुद्र/शिव की भव्य स्तुति। शतरुद्रीय का भाग — सर्वोत्तम रुद्र पाठ।",
    benefits: ["शिव कृपा", "रोग नाश", "सर्व संकट निवारण", "मोक्ष"],
    fullText:
      "नमस्ते रुद्र मन्यव उतो त उषसे नमः ।\nनमस्ते अस्तु धन्वने बाहुभ्यामुत ते नमः ॥\nया त इषुः शिवतमा शिवं बभूव ते धनुः ।\nशिवा शरव्या या तव तया नो रुद्र मृडय ॥\nया ते रुद्र शिवा तनूः शिवा विश्वाहा भेषजी ।\nशिवा रुद्रस्य भेषजी तया नो मृड जीवसे ॥",
    transliteration:
      "namaste rudra manyava uto ta uṣase namaḥ |\nnamas te astu dhanvane bāhubhyāmuta te namaḥ ||\nyā ta iṣuḥ śivatamā śivaṃ babhūva te dhanuḥ |\nśivā śaravyā yā tava tayā no rudra mṛḍaya ||\nyā te rudra śivā tanūḥ śivā viśvāhā bheṣajī |\nśivā rudrasya bheṣajī tayā no mṛḍa jīvase ||",
    meaning:
      "Salutation to your wrath, O Rudra, and salutation to your dawn-arrow. Salutation to your bow and your two arms. Let your most auspicious arrow be auspicious to us. With that arrow of yours that is healing, O Rudra, have mercy on us. That gracious form of yours, O Rudra, which is all-healing — with that healing form of Rudra grant us bliss and life.",
  },
  {
    id: "roganivaran",
    name: "Roganivaran Suktam",
    nameHindi: "रोगनिवारण सूक्तम्",
    deity: "Healing deities",
    deityHindi: "रोग निवारण देवता",
    vedaSource: "Atharvaveda",
    totalMantras: 10,
    alphabetGroup: "भ-व",
    shortDescription:
      "रोग और बीमारियों से मुक्ति के लिए। आयुर्वेद और वैदिक चिकित्सा का आधार।",
    benefits: ["रोग मुक्ति", "स्वास्थ्य लाभ", "दीर्घायु", "मानसिक शांति"],
    fullText:
      "अयं मे हस्तो भगवान् अयं मे भगवत्तरः ।\nअयं मे विश्वभेषजोऽयं शिवाभिमर्शनः ॥\nहस्ताभ्यां दशशाखाभ्यां जिह्वा वाचः पुरोगवी ।\nअनामयित्नुभ्यां हस्ताभ्यां ताभ्यां त्वाऽभिमृशामसि ॥",
    transliteration:
      "ayaṃ me hasto bhagavān ayaṃ me bhagaVattaraḥ |\nayaṃ me viśvabheṣajo'yaṃ śivābhimarśanaḥ ||\nhastābhyāṃ daśaśākhābhyāṃ jihvā vācaḥ purogavī |\nanāmayitnubhyāṃ hastābhyāṃ tābhyāṃ tvā'bhimṛśāmasi ||",
    meaning:
      "This hand of mine is blessed, it is most blessed. This hand is all-healing, this hand is auspicious to touch. With my two hands of ten branches, with tongue as the vanguard of speech — with these healing hands I touch and heal you.",
  },
  {
    id: "lakshmi",
    name: "Lakshmi Suktam",
    nameHindi: "लक्ष्मी सूक्तम्",
    deity: "Lakshmi",
    deityHindi: "लक्ष्मी माता",
    vedaSource: "Rigveda (Khila)",
    totalMantras: 15,
    alphabetGroup: "भ-व",
    shortDescription:
      "श्री लक्ष्मी की स्तुति। धन, समृद्धि और सौभाग्य के लिए श्री सूक्त के समान फलदायी।",
    benefits: ["धन समृद्धि", "सौभाग्य", "लक्ष्मी कृपा", "दरिद्रता नाश"],
    fullText:
      "हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम् ।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह ॥\nतां म आवह जातवेदो लक्ष्मीमनपगामिनीम् ।\nयस्यां हिरण्यं विन्देयं गामश्वं पुरुषानहम् ॥",
    transliteration:
      "hiraṇyavarṇāṃ hariṇīṃ suvarṇarajataSrajam |\ncAndrāṃ hiraṇmayīṃ lakṣmīṃ jAtavedo ma āvaha ||\ntāṃ ma āvaha jātavedo lakṣmīmanapagāminīm |\nyasyāṃ hiraṇyaṃ vindeyaṃ gāmaśvaṃ puruṣānaham ||",
    meaning:
      "O Jatavedas (fire), bring to me Lakshmi of golden hue, who shines like gold and silver, who wears golden garlands, who is like the moon, golden in splendor. Bring to me that Lakshmi who never departs, through whom I may find gold, cattle, horses, and children.",
  },
  {
    id: "vak",
    name: "Vak Suktam",
    nameHindi: "वाक् सूक्तम्",
    deity: "Vak (Speech Goddess)",
    deityHindi: "वाक् देवी/सरस्वती",
    vedaSource: "Rigveda 10.71 & 10.125",
    totalMantras: 11,
    alphabetGroup: "भ-व",
    shortDescription: "वाक् देवी — दिव्य वाणी की देवी की स्तुति। सरस्वती का एक स्वरूप।",
    benefits: ["वाक् सिद्धि", "कवित्व शक्ति", "वक्तृत्व", "ज्ञान और विद्या"],
    fullText:
      "बृहस्पते प्रथमं वाचो अग्रं यत् प्रैरत नामधेयं दधानाः ।\nयदेषां श्रेष्ठं यदरिप्रमासीत् प्रेणा तदेषां निहितं गुहाविः ॥\nसक्तुमिव तितउना पुनन्तो यत्र धीरा मनसा वाचमक्रत ।\nअत्रा सखायः सख्यानि जानते भद्रैषां लक्ष्मीर्निहिताधि वाचि ॥",
    transliteration:
      "bṛhaspate prathamaṃ vāco agraṃ yat praira tanāmadheyaṃ dadhānāḥ |\nyadEṣāṃ śreṣṭhaṃ yadaripramāsīt preNā taDeṣāṃ nihitaṃ guhāviḥ ||\nsaktumiva titaunā punanto yatra dhīrā manasā vācamakrata |\natrā sakhāyaḥ sakhyāni jānate bhadraiṣāṃ lakṣmīrnihitādhi vāci ||",
    meaning:
      "O Brihaspati, when the first cause of speech was given its name, the best and purest of their speech was hidden in the divine secret. Where the wise ones purified speech with their mind, as if filtering through a sieve — there the friends know their friendship, and auspicious fortune is lodged in their speech.",
  },
  {
    id: "varuna",
    name: "Varuna Suktam",
    nameHindi: "वरुण सूक्तम्",
    deity: "Varuna",
    deityHindi: "वरुण देव",
    vedaSource: "Rigveda 7.86-88",
    totalMantras: 12,
    alphabetGroup: "भ-व",
    shortDescription: "वरुण देव — समुद्र और ऋत (सत्य-व्यवस्था) के देवता की स्तुति।",
    benefits: [
      "पाप क्षमा",
      "सत्य का पालन",
      "न्याय की प्राप्ति",
      "समुद्र यात्रा में सफलता",
    ],
    fullText:
      "युवं राजानं वरुणं भुरण्युम् मित्रं देवमिन्द्रं च नमसा ।\nतान् गीर्भिर्देवान् वयं हुवेम ॥\nकदा ते मन्यु वरुण ध्रुवासो मिनन्ति शिप्रे अहिघ्न उग्र ।\nकिं त आगो वरुण जारिता का ॥\nप्र मा वरुण भेजे ऋतस्य पन्थाम् ॥",
    transliteration:
      "yuvaṃ rājānaṃ varuṇaṃ bhuraṇyum mitraṃ devamIndraṃ ca namasā |\ntān gīrBhirdevān vayaṃ huvema ||\nkadā te manyu varuṇa dhruvāso minanti śipre ahighna ugra |\nkiṃ ta āgo varuṇa jāritā kā ||\npra mā varuṇa bheje ṛtasya panthām ||",
    meaning:
      "We invoke with hymns the wise king Varuna, divine Mitra, and Indra with reverence. O mighty Varuna, punisher of serpents, when will your steadfast wrath dissolve? What offense of mine, O Varuna, do you punish? O Varuna, lead me along the path of truth.",
  },

  // ── GROUP "व-ह" ──────────────────────────────────────────────────────────
  {
    id: "vishnu",
    name: "Vishnu Suktam",
    nameHindi: "विष्णु सूक्तम्",
    deity: "Vishnu",
    deityHindi: "विष्णु भगवान",
    vedaSource: "Rigveda 1.154",
    totalMantras: 6,
    alphabetGroup: "व-ह",
    shortDescription:
      "विष्णु के तीन विश्व-पदों (त्रिविक्रम) का वर्णन। वामन अवतार से संबंधित।",
    benefits: ["विष्णु कृपा", "त्रिलोक की शक्ति", "मोक्ष", "सर्व कल्याण"],
    fullText:
      "विष्णोर्नु कं वीर्याणि प्र वोचं यः पार्थिवानि विममे रजांसि ।\nयो अस्कभायदुत्तरं सधस्थं विचक्रमाणस्त्रेधोरुगायः ॥\nप्र तद्विष्णुः स्तवते वीर्येण मृगो न भीमः कुचरो गिरिष्ठाः ।\nयस्योरुषु त्रिषु विक्रमणेषु अधिक्षियन्ति भुवनानि विश्वा ॥\nतद्विष्णोः परमं पदं सदा पश्यन्ति सूरयः ।\nदिवीव चक्षुराततम् ॥",
    transliteration:
      "viṣṇornu kaṃ vīryāṇi pra vocaṃ yaḥ pārthivāni vimame rajāṃsi |\nyo askabhāyaduttaraṃ sadasthaṃ vicakramāṇastredhoru Gāyaḥ ||\npra tadviṣṇuḥ stavate vīryeṇa mṛgo na bhīmaḥ kucaro giriṣṭhāḥ |\nyasyoruṣu triṣu vikramaṇeṣu adhikṣiyanti bhuvanāni viśvā ||\ntadviṣṇoḥ paramaṃ padaṃ sadā paśyanti sūrayaḥ |\ndivīva cakṣurātatam ||",
    meaning:
      "I will now proclaim the mighty deeds of Vishnu, who measured out the earthly realms, who supported the highest abode — he of wide-step, the three-strider. Vishnu is praised for his heroic deeds — like a terrible lion roaming mountains. In his three strides all the worlds dwell. The highest step of Vishnu, the wise ever behold — like an eye stretched across the sky.",
  },
  {
    id: "shri",
    name: "Shri Suktam",
    nameHindi: "श्री सूक्तम्",
    deity: "Lakshmi/Shri",
    deityHindi: "श्री/लक्ष्मी",
    vedaSource: "Rigveda Khila (Appendix)",
    totalMantras: 16,
    alphabetGroup: "व-ह",
    shortDescription:
      "धन और सौभाग्य की देवी श्री लक्ष्मी का सबसे प्रसिद्ध सूक्त। शुक्रवार को पाठ से विशेष लाभ।",
    benefits: ["अखंड लक्ष्मी", "दरिद्रता नाश", "व्यापार में सफलता", "सौभाग्य"],
    fullText:
      "हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम् ।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह ॥\nतां म आवह जातवेदो लक्ष्मीमनपगामिनीम् ।\nयस्यां हिरण्यं विन्देयं गामश्वं पुरुषानहम् ॥\nआपः सृजन्तु स्निग्धानि चिक्लीत वस मे गृहे ।\nनि च देवीं मातरं श्रियं वासय मे कुले ॥",
    transliteration:
      "hiraṇyavarṇāṃ hariṇīṃ suvarṇarajataSrajam |\ncAndrāṃ hiraṇmayīṃ lakṣmīṃ jātavedo ma āvaha ||\ntāṃ ma āvaha jātavedo lakṣmīmanapagāminīm |\nyasyāṃ hiraṇyaṃ vindeyaṃ gāmaśvaṃ puruṣānaham ||\nāpaḥ sṛjantu snigdhāni ciklīta vasa me gṛhe |\nni ca devīṃ mātaraṃ śriyaṃ vāsaya me kule ||",
    meaning:
      "O Jatavedas, bring to me Lakshmi of golden hue, adorned with gold and silver garlands, luminous like the moon. Bring to me that ever-present Lakshmi through whom I may find gold, cattle, horses, and posterity. May the waters create auspiciousness; O Ciklita, dwell in my home. O divine mother Shri, establish yourself in my family.",
  },
  {
    id: "sanvad",
    name: "Sanvad Suktam",
    nameHindi: "संवाद सूक्तम्",
    deity: "Various/Dialogues",
    deityHindi: "देव-संवाद",
    vedaSource: "Rigveda",
    totalMantras: 10,
    alphabetGroup: "व-ह",
    shortDescription: "देवों के बीच संवाद का वर्णन। दार्शनिक प्रश्नों के उत्तर।",
    benefits: ["ज्ञान प्राप्ति", "जिज्ञासा शांति", "दार्शनिक बोध", "सत्य की खोज"],
    fullText:
      "को ने विन्दत् क उ नो जानात् किमिदं विश्वं भुवनं जुगोप ।\nके देवासो अदित्या ऋतस्य ॥\nपुच्छे व यस्य ब्रह्माण आसतेऽग्रे न ते वचसः ।\nविश्वे देवा अनु तत् ते क्रतुम् ॥",
    transliteration:
      "ko ne vindat ka u no jānāt kimIdaṃ viśvaṃ bhuvanaṃ jugopa |\nke devāso adityā ṛtasya ||\npucche va yasya brahmāṇa āsate'gre na te vacasaḥ |\nviśve devā anu tat te kratum ||",
    meaning:
      "Who found us? Who knows us? Who guards this whole world of existence? Which are the divine Adityas of cosmic order? The Brahmin seers sit at whose tail, not at the front of speech? All gods follow his intelligence and will.",
  },
  {
    id: "sanyasa",
    name: "Sanyasa Suktam",
    nameHindi: "सन्यास सूक्तम्",
    deity: "Brahman/Renunciation",
    deityHindi: "परब्रह्म/संन्यास",
    vedaSource: "Atharvaveda",
    totalMantras: 8,
    alphabetGroup: "व-ह",
    shortDescription: "संन्यास और त्याग की महिमा का वर्णन। मोक्ष मार्ग का विवरण।",
    benefits: ["मोक्ष की प्राप्ति", "वैराग्य", "आत्मज्ञान", "सांसारिक बंधनों से मुक्ति"],
    fullText:
      "ब्रह्म वदन्तो ब्राह्मणा उप सीदन्त आत्मनि ।\nतं विद्वांसं सम्भजन्ते ये तत् सत्यं परं विदुः ॥\nत्यज इमं लोकमुत्तमं परमेष्ठिनं ब्रह्म ।\nसत्यमेव जानतोऽहम् ॥",
    transliteration:
      "brahma vadanto brāhmaṇā upa sīdanta ātmani |\ntaṃ vidvāṃsaṃ sambhajante ye tat satyaṃ paraṃ viduḥ ||\ntyaja imaṃ lokamuttamaṃ parameṣṭhinaṃ brahma |\nsatyameva jānato'ham ||",
    meaning:
      "The Brahmins who speak of Brahman come to rest in the Self. Those who know the supreme truth honor the wise one. Renounce this world and the highest — Brahman, the supreme abode. I know only the truth.",
  },
  {
    id: "saraswati",
    name: "Saraswati Suktam",
    nameHindi: "सरस्वती सूक्तम्",
    deity: "Saraswati",
    deityHindi: "सरस्वती देवी",
    vedaSource: "Rigveda 6.61",
    totalMantras: 14,
    alphabetGroup: "व-ह",
    shortDescription:
      "माँ सरस्वती की वेदोक्त स्तुति। विद्या, कला और संगीत की देवी की आराधना।",
    benefits: ["विद्या प्राप्ति", "कला में निपुणता", "वाणी में मिठास", "स्मृति शक्ति"],
    fullText:
      "पावका नः सरस्वती वाजेभिर्वाजिनीवती ।\nयज्ञं वष्टु धियावसुः ॥\nचोदयित्री सूनृतानां चेतन्ती सुमतीनाम् ।\nयज्ञं दधे सरस्वती ॥\nमहो अर्णः सरस्वती प्र चेतयति केतुना ।\nधियो विश्वा वि राजति ॥",
    transliteration:
      "pāvakā naḥ sarasvatī vājebhirvājinīvatī |\nyajñaṃ vaṣṭu dhiyāvasuḥ ||\ncodayitrī sūnṛtānāṃ cetantī sumatīnām |\nyajñaṃ dadhe sarasvatī ||\nmaho arṇaḥ sarasvatī pra cetayati ketunā |\ndhiyo viśvā vi rājati ||",
    meaning:
      "May the purifying Saraswati, rich in nourishment, who enriches the sacrifice, worship with her wisdom. Saraswati, who inspires truth and good thoughts, upholds the sacrifice. Saraswati awakens the great ocean of consciousness with her illumined mind and illumines all intellects.",
  },
  {
    id: "sarpa-vedokt",
    name: "Sarpa Suktam Vedokt",
    nameHindi: "सर्प सूक्तम् (वेदोक्त)",
    deity: "Serpent deities",
    deityHindi: "सर्प देवता/नाग",
    vedaSource: "Rigveda 1.191",
    totalMantras: 16,
    alphabetGroup: "व-ह",
    shortDescription: "वैदिक सर्प मंत्र — सांप के काटने से रक्षा और सर्प पूजन के लिए।",
    benefits: [
      "सांप के भय से मुक्ति",
      "सर्पदंश रक्षा",
      "नाग देवता का आशीर्वाद",
      "नागपंचमी पूजन",
    ],
    fullText:
      "उत मातरमस्य त उत ते पितरं वदे ।\nद्रप्सो अंशुमतीनां सर्वाः सर्पा अलीनसः ॥\nये अन्तरिक्षे ये दिवि ये पृथिव्यां ये अप्सु ।\nतेभ्यः सर्पेभ्यो नमो नमः ॥",
    transliteration:
      "uta mātaramasya ta uta te pitaraṃ vade |\ndrapso aṃśumatīnāṃ sarvāḥ sarpā alīnasaḥ ||\nye antarikṣe ye divi ye pṛthivyāṃ ye apsu |\ntebhyaḥ sarpebhyo namo namaḥ ||",
    meaning:
      "I address your mother and your father too. O serpents of the grass-blades, all of you — those in the air, those in heaven, those on earth, those in the waters — to all those serpents, homage, homage.",
  },
  {
    id: "sarpa",
    name: "Sarpa Suktam",
    nameHindi: "सर्प सूक्तम्",
    deity: "Serpent deities",
    deityHindi: "नाग देवता",
    vedaSource: "Atharvaveda",
    totalMantras: 10,
    alphabetGroup: "व-ह",
    shortDescription: "नाग देवता की आराधना। नागपंचमी और सर्पदोष निवारण के लिए।",
    benefits: ["सर्पदोष निवारण", "नाग पूजन", "काल सर्प दोष शांति", "नागलोक की कृपा"],
    fullText:
      "नमोऽस्तु सर्पेभ्यो ये के च पृथिवीमनु ।\nये अन्तरिक्षे ये दिवि तेभ्यः सर्पेभ्यो नमः ॥\nइदं सर्पेभ्यो ह विषं ब्रह्मणा हतम् ।\nसरपद्भिः शयानेभिर्धावद्भिश्च ॥\nये स्थास्नवो ये चरन्ति नमस्तेभ्यो ये पतन्ति ॥",
    transliteration:
      "namo'stu sarpebhyo ye ke ca pṛthivīmanu |\nye antarikṣe ye divi tebhyaḥ sarpebhyo namaḥ ||\nIdaṃ sarpebhyo ha viṣaṃ brahmaṇā hatam |\nsarapAdBhiḥ śayānebhirdHāvadBhiśca ||\nye sthāsnavo ye caranti namastebhyo ye patanti ||",
    meaning:
      "Salutation to the serpents of all the earth, of mid-air, and of heaven — to all those serpents, salutation! The poison of the serpents has been struck by Brahma's power. To those crawling, resting, and running — to those standing still, moving, or flying — salutation to all of them.",
  },
  {
    id: "surya",
    name: "Surya Suktam",
    nameHindi: "सूर्य सूक्तम्",
    deity: "Surya (Sun)",
    deityHindi: "सूर्य देव",
    vedaSource: "Rigveda 1.50",
    totalMantras: 13,
    alphabetGroup: "व-ह",
    shortDescription:
      "सूर्य देव की स्तुति। रोज प्रातः पाठ से नेत्र रोग और चर्म रोग में विशेष लाभ।",
    benefits: ["नेत्र ज्योति", "चर्म रोग निवारण", "ऊर्जा प्राप्ति", "उत्तम स्वास्थ्य"],
    fullText:
      "उद्वयं तमसस्परि पश्यन्तो ज्योतिरुत्तरम् ।\nदेवं देवत्रा सूर्यमगन्म ज्योतिरुत्तमम् ॥\nउत्तिष्ठ ब्रह्मणस्पते देवयन्तस्त्वेमहे ।\nउपप्र यन्तु मरुतः इन्द्रवायू उत त्वम् ॥\nचित्रं देवानामुदगादनीकं चक्षुर्मित्रस्य वरुणस्याग्नेः ।\nआप्रा द्यावापृथिवी अन्तरिक्षं सूर्य आत्मा जगतस्तस्थुषश्च ॥",
    transliteration:
      "udvayaṃ tamasaspari paśyanto jyotiruttaram |\ndevaṃ devatrā sūryamagamna jyotiruttamam ||\nuttIṣṭha brahmaṇaspate devayantastvemAhe |\nupapra yantu marutaḥ indravāyū uta tvam ||\ncitRAṃ devānāmudagādanīkaṃ cakṣurmitrasya varuṇasyāgneḥ |\nāprā dyāvāpṛthivī antarikshaṃ sūrya ātmā jagatastaSThuṣaśca ||",
    meaning:
      "Looking upward beyond the darkness, we see the higher light. We have come to the divine Sun, the highest light among the gods. Rise, O Brahmanaspati — we seek you with devotion. Let the Maruts come, Indra, Vayu, and you too. The brilliant countenance of the gods has appeared — the eye of Mitra, Varuna, and Agni. The Sun fills heaven and earth and mid-air, and is the soul of all that moves and stands.",
  },
  {
    id: "swasti",
    name: "Swasti Suktam",
    nameHindi: "स्वस्ति सूक्तम्",
    deity: "Auspiciousness",
    deityHindi: "मंगल/स्वस्ति",
    vedaSource: "Rigveda/Yajurveda",
    totalMantras: 6,
    alphabetGroup: "व-ह",
    shortDescription:
      "सर्वमंगल की प्रार्थना। यात्रा, नए कार्य और शुभ अवसरों पर पाठ किया जाता है।",
    benefits: [
      "यात्रा में सुरक्षा",
      "शुभ कार्यों में सफलता",
      "सर्वत्र मंगल",
      "ईश्वर का आशीर्वाद",
    ],
    fullText:
      "स्वस्ति न इन्द्रो वृद्धश्रवाः स्वस्ति नः पूषा विश्ववेदाः ।\nस्वस्ति नस्तार्क्ष्यो अरिष्टनेमिः स्वस्ति नो बृहस्पतिर्दधातु ॥\nस्वस्ति पन्थामनुचरेम सूर्याचन्द्रमसाविव ।\nपुनर्ददताघ्नता जानता संगमेमहि ॥",
    transliteration:
      "svasti na indro vṛddhaśravāḥ svasti naḥ pūṣā viśvavedāḥ |\nsvasti nastārkṣyo ariṣṭanemiḥ svasti no bṛhaspatirdadhātu ||\nsvasti panthāmanucarema sūryācandramasāviva |\npunardadatāghnata jānatā saṃgamemahi ||",
    meaning:
      "May Indra of great fame grant us auspiciousness; may Pushan the all-knowing grant us auspiciousness; may Tarksya of unbroken rim grant us auspiciousness; may Brihaspati grant us auspiciousness. May we follow the path of auspiciousness like the sun and moon. May we meet again — those who give, who do not harm, who know.",
  },
  {
    id: "hanuman",
    name: "Hanuman Suktam",
    nameHindi: "हनुमान सूक्तम्",
    deity: "Hanuman",
    deityHindi: "हनुमान जी",
    vedaSource: "Later Vedic/Traditional",
    totalMantras: 12,
    alphabetGroup: "व-ह",
    shortDescription: "बजरंगबली हनुमान की स्तुति। शक्ति, भक्ति और संकट निवारण के लिए।",
    benefits: ["संकट निवारण", "अलौकिक शक्ति", "राम भक्ति", "भूत-प्रेत बाधा नाश"],
    fullText:
      "अञ्जनानन्दनं वीरं जानकीशोककारणम् ।\nकपीशमक्षहन्तारं वन्दे लंकाभयंकरम् ॥\nमनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् ।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये ॥\nभूतनाथाय विद्महे वायुपुत्राय धीमहि ।\nतन्नो हनुमत् प्रचोदयात् ॥",
    transliteration:
      "añjanānandanaṃ vīraṃ jānakīśokakāraṇam |\nkapīśamakṣahantāraṃ vande laṃkābhayaṃkaram ||\nmanojavaṃ mārutaTulyavegaṃ jitendriyaṃ buddhimatāṃ variṣṭham |\nvātātmajaṃ vānarayūthamukhyaṃ śrīrāmadūtaṃ śaraṇaṃ prapadye ||\nbhūtanāthāya vidmahe vāyuputrāya dhīmahi |\ntanno hanumat pracodayāt ||",
    meaning:
      "I bow to the valiant son of Anjana, who was the cause of Janaki's grief (to enemies), the king of monkeys who slew Aksha, the terror of Lanka. Swift as thought, equal in speed to the wind, master of senses, foremost among the wise — son of the wind-god, chief of the monkey hosts, the messenger of Shri Ram — to him I take refuge. May we contemplate on the lord of beings, meditate on the son of Vayu — may Hanuman inspire us.",
  },
  {
    id: "hiranyagarbha",
    name: "Hiranyagarbha Suktam",
    nameHindi: "हिरण्यगर्भ सूक्तम्",
    deity: "Hiranyagarbha (Golden Womb/Brahma)",
    deityHindi: "हिरण्यगर्भ/ब्रह्मा",
    vedaSource: "Rigveda 10.121",
    totalMantras: 10,
    alphabetGroup: "व-ह",
    shortDescription:
      "सृष्टि के प्रारंभ में हिरण्यगर्भ (सुनहरे गर्भ) का वर्णन। ब्रह्मांड की उत्पत्ति का वेदोक्त रहस्य।",
    benefits: ["ब्रह्म ज्ञान", "सृष्टि का रहस्य", "दिव्य चेतना", "उच्च आध्यात्मिक अनुभव"],
    fullText:
      "हिरण्यगर्भः समवर्तताग्रे भूतस्य जातः पतिरेक आसीत् ।\nस दाधार पृथिवीं द्यामुतेमां कस्मै देवाय हविषा विधेम ॥\nयः प्राणतो निमिषतो महित्वैक इद्राजा जगतो बभूव ।\nय ईशे अस्य द्विपदश्चतुष्पदः कस्मै देवाय हविषा विधेम ॥\nकस्मै देवाय हविषा विधेम तत् प्रजापतये ॥",
    transliteration:
      "hiraṇyagarbhaḥ samavartataGre bhūtasya jātaḥ patirekAAsīt |\nsa dādhāra pṛthivīṃ dyāmutEmāṃ kasmai devāya haviṣā vidhema ||\nyaḥ prāṇato nimiṣato mahitvaikaId rājā jagato babhūva |\nya īśe asya dvipadaścatuṣpadaḥ kasmai devāya haviṣā vidhema ||\nkasmai devāya haviṣā vidhema tat prajāpataye ||",
    meaning:
      "In the beginning arose Hiranyagarbha — the only born lord of all existence. He established this earth and sky. To which god shall we offer our oblation? He became the sole king of all that breathes and winks, through the greatness of his might. He rules over all that is two-footed and four-footed. To which god shall we offer? To that Prajapati.",
  },
  {
    id: "jinvani",
    name: "Jinvani",
    nameHindi: "जिनवाणी",
    deity: "Tirthankar",
    deityHindi: "तीर्थंकर",
    vedaSource: "Jain Tradition",
    totalMantras: 14,
    alphabetGroup: "व-ह",
    shortDescription:
      "जैन तीर्थंकरों की दिव्य वाणी — आगम ग्रंथों का सार। अहिंसा, सत्य, अपरिग्रह की शिक्षा।",
    benefits: ["आत्मशुद्धि", "कर्म नाश", "अहिंसा का पालन", "मोक्ष मार्ग"],
    fullText:
      "णमो अरिहंताणं णमो सिद्धाणं णमो आइरियाणं ।\nणमो उवज्झायाणं णमो लोए सव्व साहूणं ॥\nएसो पंच णमुक्कारो सव्व पावप्पणासणो ।\nमंगलाणं च सव्वेसिं पढमं हवइ मंगलं ॥\nजिणाणं वयणं सुत्तं सव्व दुक्ख विमोक्खणं ।\nसव्व सत्ताणं हियं बोहिं जिणा पब्भासए ॥",
    transliteration:
      "ṇamo arihantāṇaṃ ṇamo siddhāṇaṃ ṇamo āiriyāṇaṃ |\nṇamo uvajjhāyāṇaṃ ṇamo loe savva sāhūṇaṃ ||\neso paṃca ṇamūkkāro savva pāvappaṇāsaṇo |\nmaṃgalāṇaṃ ca savvesiṃ paḍhamaṃ havai maṃgalaṃ ||\njiṇāṇaṃ vayaṇaṃ suttaṃ savva dukkha vimokkhaṇaṃ |\nsavva sattāṇaṃ hiyaṃ bohiṃ jiṇā pabbhāsae ||",
    meaning:
      "Salutation to the Arihantas (liberated souls), to the Siddhas (perfected ones), to the Acharyas (masters), to the Upadhyayas (teachers), and to all Sadhus in the world. This five-fold salutation destroys all sin and is the most auspicious of all auspicious things. The sacred words of the Jinas are the liberator from all suffering. The Jinas proclaim knowledge for the welfare of all beings.",
  },
];
