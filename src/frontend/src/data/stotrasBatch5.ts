/**
 * storasBatch5.ts — Part 5 Stotras (6 entries)
 *
 * Stotras: Durga Saptashloki, Kaal Bhairav Ashtak, Dwadash Jyotirlinga Stotram,
 *          Sankat Nashak Ganesh Stotra, Laxmi Narayan Stotra, Pitru Stotra
 *
 * Schema: { id, title, deity, faith, type, category, text: string[],
 *           transliteration: string[], meaning: string, benefits: string[] }
 */

export interface StotraBatch5Entry {
  id: string;
  title: string;
  deity: string;
  faith: "Hindu" | "Jain" | "Sikh";
  type: "Stotra" | "Ashtakam" | "Stotram" | "Kavach" | "Stuti" | "Sahasranama";
  category: string;
  text: string[];
  transliteration: string[];
  meaning: string;
  benefits: string[];
}

export const storasBatch5: StotraBatch5Entry[] = [
  {
    id: "durga-saptashloki",
    title: "Durga Saptashloki",
    deity: "Durga",
    faith: "Hindu",
    type: "Stotra",
    category: "Shakti",
    text: [
      "॥ दुर्गा सप्तश्लोकी ॥",
      "ॐ ज्ञानिनामपि चेतांसि देवी भगवती हि सा।\nबलादाकृष्य मोहाय महामाया प्रयच्छति॥१॥",
      "दुर्गे स्मृता हरसि भीतिमशेषजन्तोः\nस्वस्थैः स्मृता मतिमतीव शुभां ददासि।\nदारिद्र्यदुःखभयहारिणि का त्वदन्या\nसर्वोपकारकरणाय सदार्द्रचित्ता॥२॥",
      "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥३॥",
      "शरणागतदीनार्तपरित्राणपरायणे।\nसर्वस्यार्तिहरे देवि नारायणि नमोऽस्तु ते॥४॥",
      "सर्वस्वरूपे सर्वेशे सर्वशक्तिसमन्विते।\nभयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तु ते॥५॥",
      "रोगानशेषानपहंसि तुष्टा रुष्टा तु कामान् सकलानभीष्टान्।\nत्वामाश्रितानां न विपन्नराणां त्वामाश्रिता ह्याश्रयतां प्रयान्ति॥६॥",
      "सर्वाबाधाप्रशमनं त्रैलोक्यस्याखिलेश्वरि।\nएवमेव त्वया कार्यमस्मद्वैरिविनाशनम्॥७॥",
    ],
    transliteration: [
      "|| Durgā Saptashlokī ||",
      "Om jñānināmapi cetāṃsi devī bhagavatī hi sā |\nbalaḍākṛṣya mohāya mahāmāyā prayacchati ||1||",
      "Durge smṛtā harasi bhītimāśeṣajantoh\nsvasthaiḥ smṛtā matimatīva śubhāṃ dadāsi |\ndāridryaduḥkhabhayahāriṇi kā tvadanyā\nsarvopakārakaraṇāya sadārdracittā ||2||",
      "Sarvamaṅgalamāṅgalye śive sarvārthasādhike |\nśaraṇye tryambake gauri nārāyaṇi namo'stu te ||3||",
      "Śaraṇāgatadīnārtaaparitrāṇaparāyaṇe |\nsarvasyārtiahare devi nārāyaṇi namo'stu te ||4||",
      "Sarvasvarūpe sarveśe sarvaśaktisamanvite |\nbhayebhyastrāhi no devi durge devi namo'stu te ||5||",
      "Rogānaśeṣānapahāṃsi tuṣṭā ruṣṭā tu kāmān sakalānabhīṣṭān |\ntvāmāśritānāṃ na vipannarāṇāṃ tvāmāśritā hyāśrayatāṃ prayānti ||6||",
      "Sarvābādhāpraśamanaṃ trailokasyākhileśvari |\nevameva tvayā kāryamasmadvairivināśanam ||7||",
    ],
    meaning:
      "These seven essential verses from Devi Mahatmyam describe the Goddess as the supreme Mahamaya who controls even the minds of the wise; who removes fears of those who remember her in distress and grants excellent intelligence to the healthy; the all-auspicious Narayani who is the refuge of the surrendered; who removes all distress of the three worlds; and destroys all obstacles and enemies of her devotees.",
    benefits: [
      "Reciting these 7 shlokas is equivalent to reading the complete Durga Saptashati (700 verses)",
      "Provides divine protection from all evil, black magic, and negative energies",
      "Removes poverty, disease, fear, and all forms of suffering",
      "Destroys enemies and obstacles in personal and professional life",
      "Invokes the blessings of Goddess Durga in her most powerful form",
      "Grants auspiciousness and fulfillment of all righteous desires",
      "Best recited during Navratri, Fridays, and during Shraddha ceremonies",
    ],
  },
  {
    id: "kaal-bhairav-ashtak",
    title: "Kaal Bhairav Ashtak",
    deity: "Kaal Bhairav",
    faith: "Hindu",
    type: "Ashtakam",
    category: "Shaiva",
    text: [
      "॥ काल भैरव अष्टकम् ॥\n(आदि शंकराचार्य विरचितम्)",
      "देवराजसेव्यमानपावनाङ्घ्रिपङ्कजं\nव्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम्।\nनारदादियोगिवृन्दवन्दितं दिगम्बरं\nकाशिकापुराधिनाथकालभैरवं भजे॥१॥",
      "भानुकोटिभास्वरं भवाब्धितारकं परं\nनीलकण्ठमीप्सितार्थदायकं त्रिलोचनम्।\nकालकालमम्बुजाक्षमक्षशूलमक्षरं\nकाशिकापुराधिनाथकालभैरवं भजे॥२॥",
      "शूलटङ्कपाशदण्डपाणिमादिकारणं\nश्यामकायमादिदेवमक्षरं निरामयम्।\nभीमविक्रमं प्रभुं विचित्रताण्डवप्रियं\nकाशिकापुराधिनाथकालभैरवं भजे॥३॥",
      "भुक्तिमुक्तिदायिनं विशालनेत्रमादिकं\nत्रिभुवनस्य पालनं क्षमावतं परं गुरुम्।\nभक्तवत्सलं स्थिरं समस्तलोकविग्रहं\nकाशिकापुराधिनाथकालभैरवं भजे॥४॥",
      "दर्शनात् भवाब्धिपारदर्शनं सुरेश्वरं\nकर्मनाशनं प्रभुं कलादिपुण्यवर्धनम्।\nयोगिनां च योगसिद्धिदायकं स्वभावतः\nकाशिकापुराधिनाथकालभैरवं भजे॥५॥",
      "राजराजसेवनीयमक्षराधिपं सुरं\nनित्यमद्वितीयमिष्टदैवतं निरञ्जनम्।\nमृत्युदर्पनाशनं करालदंष्ट्रमोक्षदं\nकाशिकापुराधिनाथकालभैरवं भजे॥६॥",
      "अट्टहासभिन्नपद्मजाण्डकोशसंस्थितं\nदृष्टिपातनष्टपापजालमुग्रशासनम्।\nअष्टसिद्धिदायकं कपालमालिकाधरं\nकाशिकापुराधिनाथकालभैरवं भजे॥७॥",
      "भूतसङ्घनायकं विशालकीर्तिदायकं\nकाशिवासलोकपुण्यपापशोधकं विभुम्।\nनीतिमार्गकोविदं पुरातनं जगत्पतिं\nकाशिकापुराधिनाथकालभैरवं भजे॥८॥",
      "कालभैरवाष्टकं पठन्ति येऽत्र मानवाः\nविभक्तकामसम्पदः सुभक्तिसिद्धिसाधकाः।\nते निरन्तरं सुखी भवन्ति मुक्तभागिनो\nज्ञाननिष्ठसर्वलोकभावनस्य पाश्वतः॥",
    ],
    transliteration: [
      "|| Kāla Bhairava Aṣṭakam || (Ādi Śaṅkarācārya viracitam)",
      "Devarāja sevyamāna pāvanāṅghri paṅkajam\nvyālayajña sūtramindushekharam kṛpākaram |\nnāradādi yogivṛnda vanditam digambaram\nkāśikāpurādhinātha kālabhairavam bhaje ||1||",
      "Bhānukoṭi bhāsvaram bhavābdhi tārakam param\nnīlakaṇṭham īpsitārtha dāyakam trilocanam |\nkālakālam ambujākṣam akṣaśūlam akṣaram\nkāśikāpurādhinātha kālabhairavam bhaje ||2||",
      "Śūlaṭaṅka pāśadaṇḍa pāṇim ādi kāraṇam\nśyāmakāyam ādidevam akṣaram nirāmayam |\nbhīmavikramam prabhum vicitrāṭāṇḍava priyam\nkāśikāpurādhinātha kālabhairavam bhaje ||3||",
      "Bhuktimukti dāyinam viśāla netram ādikam\ntribhuvanasya pālanam kṣamāvatam param gurum |\nbhaktavatsalam sthiram samasta loka vigraham\nkāśikāpurādhinātha kālabhairavam bhaje ||4||",
      "Darśanāt bhavābdhi pāradarśanam sureśvaram\nkarmanāśanam prabhum kalādi puṇya vardhanam |\nyogināṃ ca yogasiddhi dāyakam svabhāvataḥ\nkāśikāpurādhinātha kālabhairavam bhaje ||5||",
      "Rājarāja sevanīyam akṣarādhipam suram\nnityam advitīyam iṣṭadaivataṃ nirañjanam |\nmṛtyudarpa nāśanam karāladaṃṣṭra mokṣadam\nkāśikāpurādhinātha kālabhairavam bhaje ||6||",
      "Aṭṭahāsa bhinna padmajāṇḍa kośasamsthitam\ndṛṣṭipāta naṣṭapāpa jālam ugra śāsanam |\naṣṭasiddhi dāyakam kapāla mālikādharam\nkāśikāpurādhinātha kālabhairavam bhaje ||7||",
      "Bhūtasaṅgha nāyakam viśāla kīrti dāyakam\nkāśivāsa loka puṇyapāpa śodhakam vibhum |\nnīti mārga kovidaṃ purātanam jagat patim\nkāśikāpurādhinātha kālabhairavam bhaje ||8||",
      "Kālabhairavāṣṭakaṃ paṭhanti ye'tra mānavāḥ\nvibhakta kāma sampadaḥ su bhakti siddhi sādhakāḥ |\nte nirantaraṃ sukhī bhavanti mukta bhāginaḥ\njñānaniṣṭha sarva loka bhāvanasya pāśvataḥ ||",
    ],
    meaning:
      "Composed by Adi Shankaracharya, this Ashtakam praises Kaal Bhairav — the fierce form of Lord Shiva who is the supreme Lord of Kashi (Varanasi) and master of Time (Kaal). Each verse describes him as worshipped by Indra himself, shining brighter than a billion suns, the destroyer of sin by mere sight, the granter of all eight supernatural powers (Ashta Siddhi), the fearsome four-armed deity holding trident, noose, staff, and skull, who purifies both the merits and sins of all who live in Kashi.",
    benefits: [
      "Those who recite Kaal Bhairav Ashtakam attain uninterrupted happiness and liberation",
      "Destroys all accumulated sins of past lifetimes by his mere sight",
      "Grants all eight supernatural powers (Ashta Siddhi) to sincere devotees",
      "Removes the fear of death and protects from untimely death",
      "Bestows devotion, spiritual accomplishment, and liberation from karmic bondage",
      "Especially powerful to recite on Kalabhairav Ashtami and Sundays",
      "Grants victory in legal matters and court cases under his governance as dharma-judge",
    ],
  },
  {
    id: "dwadash-jyotirlinga-stotram",
    title: "Dwadash Jyotirlinga Stotram",
    deity: "Shiva",
    faith: "Hindu",
    type: "Stotram",
    category: "Shaiva",
    text: [
      "॥ द्वादश ज्योतिर्लिंग स्तोत्रम् ॥",
      "सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम्।\nउज्जयिन्यां महाकालमोंकारममलेश्वरम्॥१॥",
      "परल्यां वैजनाथं च डाकिन्यां भीमशंकरम्।\nसेतुबन्धे तु रामेशं नागेशं दारुकावने॥२॥",
      "वाराणस्यां तु विश्वेशं त्र्यम्बकं गौतमीतटे।\nहिमालये तु केदारं घुश्मेशं च शिवालये॥३॥",
      "एतानि ज्योतिर्लिङ्गानि सायं प्रातः पठेन्नरः।\nसप्तजन्मकृतं पापं स्मरणेन विनश्यति॥४॥",
      "एतेशां दर्शनादेव पातकं नाशमेष्यति।\nपुनर्जन्म न चैवास्ति पुनर्जन्म न चैवास्ति॥५॥",
    ],
    transliteration: [
      "|| Dvādaśa Jyotirliṅga Stotram ||",
      "Saurāṣṭre Somānāthaṃ ca Śrīśaile Mallikārjunam |\nUjjayinyāṃ Mahākālam Oṃkāram amaleshvaram ||1||",
      "Paralyāṃ Vaidjanāthaṃ ca Ḍākinyāṃ Bhīmaśaṅkaram |\nSetubandhe tu Rāmeśaṃ Nāgeśaṃ Dārukāvane ||2||",
      "Vārāṇasyāṃ tu Viśveśaṃ Tryambakaṃ Gautamītaṭe |\nHimālaye tu Kedāraṃ Ghuśmeśaṃ ca Śivālaye ||3||",
      "Etāni jyotirliṅgāni sāyaṃ prātaḥ paṭhennaraḥ |\nSaptajanmakṛtaṃ pāpaṃ smaraṇena vinaśyati ||4||",
      "Eteśāṃ darśanādeva pātakaṃ nāśameṣyati |\nPunarjanma na caivāsti punarjanma na caivāsti ||5||",
    ],
    meaning:
      "This concise stotra names all twelve Jyotirlingas — the self-manifested pillars of divine light of Lord Shiva: Somnath in Saurashtra, Mallikarjuna at Srishaila, Mahakal at Ujjain, Omkareshwar at Omkar Island, Vaidyanath at Parali, Bhimashankar in Dakini forest, Rameswaram at Setubandha, Nageshwar at Darukavana, Vishweshwar at Varanasi, Trimbakeshwar at Gautami (Godavari), Kedarnath in the Himalayas, and Grishneshwar at Shivalaya. These are the 12 most sacred abodes of Lord Shiva.",
    benefits: [
      "Reciting morning and evening destroys sins accumulated over seven lifetimes",
      "Equivalent in merit to physically visiting all twelve Jyotirlinga pilgrimage sites",
      "Completely destroys all sins and ends the cycle of rebirth",
      "Grants the grace and blessings of all twelve forms of Shiva simultaneously",
      "Provides protection from all planetary doshas and negative cosmic influences",
      "Bestows liberation (moksha) to those who recite with sincere devotion",
    ],
  },
  {
    id: "sankat-nashak-ganesh-stotra",
    title: "Sankat Nashak Ganesh Stotra",
    deity: "Ganesha",
    faith: "Hindu",
    type: "Stotra",
    category: "Ganapatya",
    text: [
      "॥ संकट नाशक गणेश स्तोत्र ॥",
      "नारद उवाच —\nप्रणम्य शिरसा देवं गौरीपुत्रं विनायकम्।\nभक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये॥१॥",
      "प्रथमं वक्रतुण्डं च एकदन्तं द्वितीयकम्।\nतृतीयं कृष्णपिङ्गाक्षं गजवक्त्रं चतुर्थकम्॥२॥",
      "लम्बोदरं पञ्चमं च षष्ठं विकटमेव च।\nसप्तमं विघ्नराजेन्द्रं धूम्रवर्णं तथाष्टमम्॥३॥",
      "नवमं भालचन्द्रं च दशमं तु विनायकम्।\nएकादशं गणपतिं द्वादशं तु गजाननम्॥४॥",
      "द्वादशैतानि नामानि त्रिसन्ध्यं यः पठेन्नरः।\nन च विघ्नभयं तस्य सर्वसिद्धिर्भवेत् तदा॥५॥",
      "विद्यार्थी लभते विद्यां धनार्थी लभते धनम्।\nपुत्रार्थी लभते पुत्रान् मोक्षार्थी लभते गतिम्॥६॥",
      "जपेद्गणपतिस्तोत्रं षड्भिर्मासैः फलं लभेत्।\nसंवत्सरेण सिद्धिं च लभते नात्र संशयः॥७॥",
      "अष्टभ्यो ब्राह्मणेभ्यश्च लिखित्वा यः समर्पयेत्।\nतस्य विद्या भवेत् सर्वा गणेशस्य प्रसादतः॥८॥",
    ],
    transliteration: [
      "|| Saṅkaṭa Nāśaka Gaṇeśa Stotra ||",
      "Nārada uvāca —\nPraṇamya śirasā devaṃ Gaurīputraṃ Vināyakam |\nbhaktāvāsaṃ smaren nityam āyuḥ kāmārtha siddhaye ||1||",
      "Prathamaṃ Vakratuṇḍaṃ ca Ekadantaṃ dvitīyakam |\ntṛtīyaṃ Kṛṣṇapiṅgākṣaṃ Gajavaktraṃ caturtham ||2||",
      "Lambodaram pañcamaṃ ca ṣaṣṭhaṃ Vikaṭam eva ca |\nsaptamaṃ Vighnarājendraṃ Dhūmravarṇaṃ tathāṣṭamam ||3||",
      "Navamaṃ Bhālacandraṃ ca daśamaṃ tu Vināyakam |\nekādaśaṃ Gaṇapatiṃ dvādaśaṃ tu Gajānanam ||4||",
      "Dvādaśaitāni nāmāni trisandhyaṃ yaḥ paṭhen naraḥ |\nna ca vighna bhayaṃ tasya sarva siddhir bhavet tadā ||5||",
      "Vidyārthī labhate vidyāṃ dhanārthī labhate dhanam |\nputrārthī labhate putrān mokṣārthī labhate gatim ||6||",
      "Japeḍ Gaṇapati stotraṃ ṣaḍbhir māsaiḥ phalaṃ labhet |\nsaṃvatsareṇa siddhiṃ ca labhate nātra saṃśayaḥ ||7||",
      "Aṣṭabhyo brāhmaṇebhyaśca likhitvā yaḥ samarpayeṭ |\ntasya vidyā bhavet sarvā Gaṇeśasya prasādataḥ ||8||",
    ],
    meaning:
      "Narada recites the twelve sacred names of Lord Ganesha — Vakratunda (curved trunk), Ekadanta (single tusk), Krishnapingaksha (dark reddish eyes), Gajavaktra (elephant face), Lambodara (large belly), Vikata (fierce form), Vighnarajendra (king of obstacle-removers), Dhumravarna (smoke-colored), Bhalchandra (with moon on forehead), Vinayaka (supreme leader), Ganapati (lord of Ganas), and Gajanana (elephant-faced). Each name represents a distinct divine aspect. Reciting all twelve thrice daily removes all obstacles and grants all desires.",
    benefits: [
      "Reciting the 12 names thrice daily (morning, noon, evening) removes all obstacles without fail",
      "Students gain education and knowledge; the poor gain wealth and prosperity",
      "Childless couples are blessed with children; spiritual seekers attain liberation",
      "Six months of regular recitation yields visible fruits and blessings",
      "One year of continuous recitation grants Siddhi (spiritual attainment)",
      "Donating a written copy to eight Brahmins brings complete knowledge through Ganesha's grace",
      "Most powerful when recited before any new venture, exam, or important decision",
    ],
  },
  {
    id: "laxmi-narayan-stotra",
    title: "Laxmi Narayan Stotra",
    deity: "Vishnu",
    faith: "Hindu",
    type: "Stotra",
    category: "Vaishnava",
    text: [
      "॥ लक्ष्मी नारायण स्तोत्र ॥",
      "नमः कमलनाभाय नमस्ते जलशायिने।\nनमस्ते केशवानन्त वासुदेव नमोऽस्तु ते॥१॥",
      "त्वमेव माता च पिता त्वमेव त्वमेव बन्धुश्च सखा त्वमेव।\nत्वमेव विद्या द्रविणं त्वमेव त्वमेव सर्वं मम देवदेव॥२॥",
      "शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम्\nविश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं\nवन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम्॥३॥",
      "क्षीरसागरसम्भूते लक्ष्मि देवि नमोऽस्तु ते।\nपद्मपत्रविशालाक्षि विष्णुवक्षस्थले स्थिते॥४॥",
      "यस्याः कटाक्षसमुपासनाविधिं सेवन्ते सर्वसुरपुङ्गवाः।\nसा माश्रयेत् करुणया भगवती भार्गवी भवतु मे वरदा॥५॥",
      "श्रियः कान्तं श्रीमतां वन्दनीयं श्रियमात्राप्यनुगतं नमामि।\nश्रियो देवीं श्री नारायणं तं नमामि देवं परमेश्वरं तम्॥६॥",
      "सर्वमङ्गलमाङ्गल्ये विष्णुवक्षस्थलस्थिते।\nसर्वदुःखप्रशमनी महालक्ष्मि नमोऽस्तु ते॥७॥",
      "लक्ष्मीनारायणाभ्यां च नमः श्रीपतये नमः।\nसर्वपापहराभ्यां च नमस्त्रैलोक्यपालने॥८॥",
    ],
    transliteration: [
      "|| Lakṣmī Nārāyaṇa Stotra ||",
      "Namaḥ kamala nābhāya namaste jalaśāyine |\nnamaste keśavānanta vāsudeva namo'stu te ||1||",
      "Tvameva mātā ca pitā tvameva tvameva bandhuśca sakhā tvameva |\ntvameva vidyā draviṇaṃ tvameva tvameva sarvaṃ mama devadeva ||2||",
      "Śāntākāraṃ bhujaggaśayanaṃ padmanābhaṃ sureśam\nviśvādhāraṃ gagana sadṛśaṃ meghavarṇaṃ śubhāṅgam |\nLakṣmīkāntaṃ kamala-nayanaṃ yogibhir dhyānagamyaṃ\nvande Viṣṇuṃ bhavabhayaharaṃ sarvalokaika nātham ||3||",
      "Kṣīrasāgara sambhūte Lakṣmi devi namo'stu te |\npadmapatrataviśālākṣi Viṣṇu vakṣaḥsthale sthite ||4||",
      "Yasyāḥ kaṭākṣa samupāsanā vidhiṃ sevante sarva surapuṅgavāḥ |\nsā māśrayet karuṇayā bhagavatī Bhārgavī bhavatu me varadā ||5||",
      "Śriyaḥ kāntaṃ śrīmatāṃ vandanīyaṃ śriyamātrāpyanugataṃ namāmi |\nśriyo devīṃ Śrī Nārāyaṇaṃ taṃ namāmi devaṃ parameśvaraṃ tam ||6||",
      "Sarvamaṅgala māṅgalye Viṣṇu vakṣaḥ sthala sthite |\nsarvaduh khapraśamanī Mahālakṣmi namo'stu te ||7||",
      "Lakṣmī Nārāyaṇābhyāṃ ca namaḥ śrīpataye namaḥ |\nsarvapāpaharābhyāṃ ca namastrai lokya pālane ||8||",
    ],
    meaning:
      "This stotra praises the divine couple Lakshmi and Narayana together. Narayana is described as lotus-naveled, resting on the cosmic serpent Shesha, the foundation of the universe, dark like rain clouds, the beloved of Lakshmi, sought by yogis in meditation, the protector of all worlds. Lakshmi is praised as born from the ocean of milk, residing on Vishnu's chest, worshipped by all the gods, the daughter of Bhrigu, the remover of all sorrows.",
    benefits: [
      "Invokes the combined blessings of both Lakshmi and Narayana for complete prosperity",
      "Removes all sins and purifies the devotee for receiving divine grace",
      "Ensures material wealth, spiritual wisdom, and liberation simultaneously",
      "Protects across all three worlds — earth, heaven, and the underworld",
      "Removes poverty and brings abundance of food, wealth, and happiness",
      "Especially powerful on Thursdays, Ekadashi, and Vaikuntha Chaturdashi",
      "Ideal for recitation before important business decisions or financial matters",
    ],
  },
  {
    id: "pitru-stotra",
    title: "Pitru Stotra",
    deity: "Pitru",
    faith: "Hindu",
    type: "Stotra",
    category: "Pitru Puja",
    text: [
      "॥ पितृ स्तोत्र ॥",
      "अर्चितानाममूर्तानां पितृणां दीप्ततेजसाम्।\nनमस्याम्यहमेकाग्रो नित्यमेव सदा च तान्॥१॥",
      "अभ्यतीतांस्तु ये पूर्वे तांश्च योऽभ्येत्य यास्यति।\nतेषां नमस्करोम्यग्रे पश्चाच्च मुनिपुङ्गवाः॥२॥",
      "नमो वः पितरः सोम्या नमो वः पितर उग्राः।\nनमो वः पितरः सूर्याः नमो वः पितर एकेभ्यः॥३॥",
      "नमो वः पितरः प्राच्यो नमो वः पितर उदीच्याः।\nनमो वः पितरः प्रतीच्यो नमो वः पितर दक्षिणाः॥४॥",
      "ये वो देवाः ये च पितरः परेषां श्रेयसि स्थिताः।\nतेभ्यो नमस्करोम्यग्रे तान् विप्रान् श्रद्धया नमे॥५॥",
      "आयान्तु पितरः सर्वे देवाश्च भुवि संस्थिताः।\nइमं श्राद्धं मया दत्तमन्नं तृप्ताः पिबन्तु ते॥६॥",
      "पितृभ्यः स्वधा नमः पितामहेभ्यः स्वधा नमः।\nप्रपितामहेभ्यः स्वधा नमः अक्षय्यं स्वधास्तु वः॥७॥",
      "पितृन् अर्चयत उद्दिश्य यः स्वधावान् कृतकृत्यवान्।\nमोदमानानां पितृणां प्रीतस्ते प्रीतिमावहेत्॥८॥",
      "देवाश्च पितरः सर्वे यान् पश्याम्यहमन्तरा।\nतेभ्यः श्रद्धाप्रयुक्ताय सर्वस्मै वः प्रतिष्ठितम्॥९॥",
      "ये केचित् पितरः सन्ति अस्माकं कुलगोत्रजाः।\nते गृह्णन्तु मया दत्तमेतत् श्राद्धमनन्तरम्॥१०॥",
    ],
    transliteration: [
      "|| Pitṛ Stotra ||",
      "Arcitānām amūrtānāṃ pitṛṇāṃ dīptatejasām |\nnamasyāmyaham ekāgro nityameva sadā ca tān ||1||",
      "Abhyatītāṃstu ye pūrve tāṃśca yo'bhyetya yāsyati |\nteṣāṃ namaskaromy agre paścācca muni puṅgavāḥ ||2||",
      "Namo vaḥ pitaraḥ somyā namo vaḥ pitara ugrāḥ |\nnamo vaḥ pitaraḥ sūryāḥ namo vaḥ pitara ekebhyaḥ ||3||",
      "Namo vaḥ pitaraḥ prācyo namo vaḥ pitara udīcyāḥ |\nnamo vaḥ pitaraḥ pratīcyo namo vaḥ pitara dakṣiṇāḥ ||4||",
      "Ye vo devāḥ ye ca pitaraḥ pareṣāṃ śreyasi sthitāḥ |\ntebhyo namaskaromy agre tān viprān śraddhayā name ||5||",
      "Āyāntu pitaraḥ sarve devāśca bhuvi saṃsthitāḥ |\nimaṃ śrāddhaṃ mayā dattam annaṃ tṛptāḥ pibantu te ||6||",
      "Pitṛbhyaḥ svadhā namaḥ pitāmahebhyaḥ svadhā namaḥ |\nprapitāmahebhyaḥ svadhā namaḥ akṣayyaṃ svadhāstu vaḥ ||7||",
      "Pitṛn arcayata uddīśya yaḥ svadhāvān kṛtakṛtyavān |\nmodamānānāṃ pitṛṇāṃ prītas te prītim āvahet ||8||",
      "Devāśca pitaraḥ sarve yān paśyāmyaham antarā |\ntebhyaḥ śraddhāprayuktāya sarvasmai vaḥ pratiṣṭhitam ||9||",
      "Ye kecit pitaraḥ santi asmākaṃ kulagotra jāḥ |\nte gṛhṇantu mayā dattam etat śrāddham anantaram ||10||",
    ],
    meaning:
      "This sacred stotra offers salutations to the ancestral souls (Pitrus) — the revered departed ancestors who are full of divine radiance. It honors those who have come before and those who will come after, saluting the gentle Pitrus (Somya) and the fierce Pitrus (Ugra), those who reside in the sun, those in each of the four directions. The stotra invites all ancestral souls to accept the Shraddha offering with satisfaction, and requests eternal peace (Akshayya Swadhaa) for all ancestors going back three generations.",
    benefits: [
      "Reciting during Pitru Paksha or Shraddha ceremonies ensures complete peace for departed ancestors",
      "Frees ancestors from lingering karmic attachments and helps them attain higher realms",
      "Removes Pitru Dosha (ancestral curse) that causes obstacles in marriage, progeny, and wealth",
      "Blesses the family lineage with prosperity, health, and happiness",
      "Protects descendants from ancestral curses and negative family karma",
      "Must be recited during Amavasya, Pitru Paksha (Shradh), and Mahalaya ceremonies",
      "Ensures that even forgotten or unnamed ancestors receive peace and liberation",
    ],
  },
];
