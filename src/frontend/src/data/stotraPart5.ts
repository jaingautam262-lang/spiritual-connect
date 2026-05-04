/**
 * stotraPart5.ts — Part 5 Stotras (6 entries)
 *
 * Schema: { id, name, deity, faith, category, text, transliteration, meaningHindi, meaningEnglish }
 */

export const stotraPart5: Array<{
  id: string;
  name: string;
  deity: string;
  faith: string;
  category: string;
  text: string;
  transliteration: string;
  meaningHindi: string;
  meaningEnglish: string;
}> = [
  {
    id: "durga-saptashloki",
    name: "दुर्गा सप्तश्लोकी",
    deity: "Durga",
    faith: "Hindu",
    category: "Shakti",
    text:
      "॥ दुर्गा सप्तश्लोकी ॥\n" +
      "ॐ ज्ञानिनामपि चेतांसि देवी भगवती हि सा।\nबलादाकृष्य मोहाय महामाया प्रयच्छति॥१॥\n" +
      "दुर्गे स्मृता हरसि भीतिमशेषजन्तोः स्वस्थैः स्मृता मतिमतीव शुभां ददासि।\nदारिद्र्यदुःखभयहारिणि का त्वदन्या सर्वोपकारकरणाय सदार्द्रचित्ता॥२॥\n" +
      "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥३॥\n" +
      "शरणागतदीनार्तपरित्राणपरायणे। सर्वस्यार्तिहरे देवि नारायणि नमोऽस्तु ते॥४॥\n" +
      "सर्वस्वरूपे सर्वेशे सर्वशक्तिसमन्विते। भयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तु ते॥५॥\n" +
      "रोगानशेषानपहंसि तुष्टा रुष्टा तु कामान् सकलानभीष्टान्।\nत्वामाश्रितानां न विपन्नराणां त्वामाश्रिता ह्याश्रयतां प्रयान्ति॥६॥\n" +
      "सर्वाबाधाप्रशमनं त्रैलोक्यस्याखिलेश्वरि। एवमेव त्वया कार्यमस्मद्वैरिविनाशनम्॥७॥",
    transliteration:
      "|| Durgā Saptashlokī ||\n" +
      "Om jñānināmapi cetāṃsi devī bhagavatī hi sā | balādākṛṣya mohāya mahāmāyā prayacchati ||1||\n" +
      "Durge smṛtā harasi bhītim aśeṣajantoh svasthaiḥ smṛtā matimatīva śubhāṃ dadāsi |\ndāridrya duḥkha bhaya hāriṇi kā tvadanyā sarvopakāra karaṇāya sadārdra cittā ||2||\n" +
      "Sarvamaṅgala māṅgalye śive sarvārtha sādhike | śaraṇye tryambake gauri nārāyaṇi namo'stu te ||3||\n" +
      "Śaraṇāgata dīnārta paritrāṇa parāyaṇe | sarvasyārti hare devi nārāyaṇi namo'stu te ||4||\n" +
      "Sarva svarūpe sarveśe sarva śakti samanvite | bhayebhyas trāhi no devi durge devi namo'stu te ||5||\n" +
      "Rogān aśeṣān apahāṃsi tuṣṭā ruṣṭā tu kāmān sakalān abhīṣṭān |\ntvām āśritānāṃ na vipanna rāṇāṃ tvām āśritā hy āśrayatāṃ prayānti ||6||\n" +
      "Sarvābādhā praśamanaṃ trailokya syākhileśvari | evam eva tvayā kāryam asmad vairi vināśanam ||7||",
    meaningHindi:
      "देवी महात्म्य के ये सात श्लोक महामाया का वर्णन करते हैं — जो ज्ञानियों के मन को भी मोह लेती हैं, संकट में स्मरण करने पर भय नष्ट करती हैं, स्वस्थ अवस्था में श्रेष्ठ बुद्धि देती हैं। सर्वमंगलमय, त्र्यम्बके गौरी नारायणी को नमन। शरणागत दीन-आर्तों की रक्षा करने वाली, तीनों लोकों की पीड़ा हरने वाली, शत्रुओं का नाश करने वाली माँ दुर्गा को प्रणाम।",
    meaningEnglish:
      "These seven essential verses from Devi Mahatmyam describe the supreme Mahamaya who controls even the minds of the wise, who removes fears of those in distress, grants auspicious intelligence to the healthy, the all-auspicious Narayani who protects the surrendered, removes all distress of the three worlds, and destroys all obstacles and enemies of her devotees. Reciting these 7 shlokas equals reading the complete Durga Saptashati (700 verses).",
  },
  {
    id: "kaal-bhairav-ashtak",
    name: "काल भैरव अष्टकम्",
    deity: "Kaal Bhairav",
    faith: "Hindu",
    category: "Shaiva",
    text:
      "॥ काल भैरव अष्टकम् ॥ (आदि शंकराचार्य विरचितम्)\n" +
      "देवराजसेव्यमानपावनाङ्घ्रिपङ्कजं व्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम्।\nनारदादियोगिवृन्दवन्दितं दिगम्बरं काशिकापुराधिनाथकालभैरवं भजे॥१॥\n" +
      "भानुकोटिभास्वरं भवाब्धितारकं परं नीलकण्ठमीप्सितार्थदायकं त्रिलोचनम्।\nकालकालमम्बुजाक्षमक्षशूलमक्षरं काशिकापुराधिनाथकालभैरवं भजे॥२॥\n" +
      "शूलटङ्कपाशदण्डपाणिमादिकारणं श्यामकायमादिदेवमक्षरं निरामयम्।\nभीमविक्रमं प्रभुं विचित्रताण्डवप्रियं काशिकापुराधिनाथकालभैरवं भजे॥३॥\n" +
      "भुक्तिमुक्तिदायिनं विशालनेत्रमादिकं त्रिभुवनस्य पालनं क्षमावतं परं गुरुम्।\nभक्तवत्सलं स्थिरं समस्तलोकविग्रहं काशिकापुराधिनाथकालभैरवं भजे॥४॥\n" +
      "दर्शनात् भवाब्धिपारदर्शनं सुरेश्वरं कर्मनाशनं प्रभुं कलादिपुण्यवर्धनम्।\nयोगिनां च योगसिद्धिदायकं स्वभावतः काशिकापुराधिनाथकालभैरवं भजे॥५॥\n" +
      "राजराजसेवनीयमक्षराधिपं सुरं नित्यमद्वितीयमिष्टदैवतं निरञ्जनम्।\nमृत्युदर्पनाशनं करालदंष्ट्रमोक्षदं काशिकापुराधिनाथकालभैरवं भजे॥६॥\n" +
      "अट्टहासभिन्नपद्मजाण्डकोशसंस्थितं दृष्टिपातनष्टपापजालमुग्रशासनम्।\nअष्टसिद्धिदायकं कपालमालिकाधरं काशिकापुराधिनाथकालभैरवं भजे॥७॥\n" +
      "भूतसङ्घनायकं विशालकीर्तिदायकं काशिवासलोकपुण्यपापशोधकं विभुम्।\nनीतिमार्गकोविदं पुरातनं जगत्पतिं काशिकापुराधिनाथकालभैरवं भजे॥८॥",
    transliteration:
      "|| Kāla Bhairava Aṣṭakam || (Ādi Śaṅkarācārya viracitam)\n" +
      "Devarāja sevyamāna pāvanāṅghri paṅkajam vyāla yajña sūtram indu śekharam kṛpākaram |\nnāradādi yogi vṛnda vanditam digambaram kāśikāpurādhi nātha kālabhairavam bhaje ||1||\n" +
      "Bhānu koṭi bhāsvaram bhavābdhi tārakam param nīlakaṇṭham īpsitārtha dāyakam trilocanam |\nkāla kālam ambujākṣam akṣa śūlam akṣaram kāśikāpurādhi nātha kālabhairavam bhaje ||2||\n" +
      "Śūla ṭaṅka pāśa daṇḍa pāṇim ādi kāraṇam śyāma kāyam ādidevam akṣaram nirāmayam |\nbhīma vikramam prabhum vicitra tāṇḍava priyam kāśikāpurādhi nātha kālabhairavam bhaje ||3||\n" +
      "Bhukti mukti dāyinam viśāla netram ādikam tribhuvanasya pālanam kṣamāvatam param gurum |\nbhakta vatsalam sthiram samasta loka vigraham kāśikāpurādhi nātha kālabhairavam bhaje ||4||\n" +
      "Darśanāt bhavābdhi pāra darśanam sureśvaram karma nāśanam prabhum kalādi puṇya vardhanam |\nyogināṃ ca yoga siddhi dāyakam svabhāvataḥ kāśikāpurādhi nātha kālabhairavam bhaje ||5||\n" +
      "Rāja rāja sevanīyam akṣarādhipam suram nityam advitīyam iṣṭa daivatam nirañjanam |\nmṛtyu darpa nāśanam karāla daṃṣṭra mokṣadam kāśikāpurādhi nātha kālabhairavam bhaje ||6||\n" +
      "Aṭṭahāsa bhinna padmajāṇḍa kośa saṃsthitam dṛṣṭi pāta naṣṭa pāpa jālam ugra śāsanam |\naṣṭa siddhi dāyakam kapāla mālikā dharam kāśikāpurādhi nātha kālabhairavam bhaje ||7||\n" +
      "Bhūta saṅgha nāyakam viśāla kīrti dāyakam kāśi vāsa loka puṇya pāpa śodhakam vibhum |\nnīti mārga kovidam purātanam jagat patim kāśikāpurādhi nātha kālabhairavam bhaje ||8||",
    meaningHindi:
      "आदि शंकराचार्य रचित यह अष्टकम् काशी (वाराणसी) के अधिपति कालभैरव की स्तुति करता है — जो इन्द्रदेव द्वारा पूजित हैं, करोड़ों सूर्यों से अधिक तेजस्वी हैं, दर्शनमात्र से पाप नष्ट करते हैं, अष्ट सिद्धियाँ प्रदान करते हैं, और भक्तों को भय, मृत्यु-दर्प तथा कर्मबंधन से मुक्त करते हैं।",
    meaningEnglish:
      "Composed by Adi Shankaracharya, this Ashtakam praises Kaal Bhairav — the fierce lord of Kashi (Varanasi) and master of Time. He is worshipped by Indra himself, shines brighter than a billion suns, destroys sin by mere sight, grants all eight supernatural powers (Ashta Siddhi), holds trident-noose-staff-skull, and purifies both merits and sins of all who dwell in Kashi. Those who recite this attain uninterrupted happiness and liberation.",
  },
  {
    id: "dwadash-jyotirlinga-stotram",
    name: "द्वादश ज्योतिर्लिंग स्तोत्रम्",
    deity: "Shiva",
    faith: "Hindu",
    category: "Shaiva",
    text:
      "॥ द्वादश ज्योतिर्लिंग स्तोत्रम् ॥\n" +
      "सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम्।\nउज्जयिन्यां महाकालमोंकारममलेश्वरम्॥१॥\n" +
      "परल्यां वैजनाथं च डाकिन्यां भीमशंकरम्।\nसेतुबन्धे तु रामेशं नागेशं दारुकावने॥२॥\n" +
      "वाराणस्यां तु विश्वेशं त्र्यम्बकं गौतमीतटे।\nहिमालये तु केदारं घुश्मेशं च शिवालये॥३॥\n" +
      "एतानि ज्योतिर्लिङ्गानि सायं प्रातः पठेन्नरः।\nसप्तजन्मकृतं पापं स्मरणेन विनश्यति॥४॥\n" +
      "एतेशां दर्शनादेव पातकं नाशमेष्यति।\nपुनर्जन्म न चैवास्ति पुनर्जन्म न चैवास्ति॥५॥",
    transliteration:
      "|| Dvādaśa Jyotirliṅga Stotram ||\n" +
      "Saurāṣṭre Somānāthaṃ ca Śrīśaile Mallikārjunam |\nUjjayinyāṃ Mahākālam Oṃkāram amaleśvaram ||1||\n" +
      "Paralyāṃ Vaidjanāthaṃ ca Ḍākinyāṃ Bhīmaśaṅkaram |\nSetubandhe tu Rāmeśaṃ Nāgeśaṃ Dārukāvane ||2||\n" +
      "Vārāṇasyāṃ tu Viśveśaṃ Tryambakaṃ Gautamītaṭe |\nHimālaye tu Kedāraṃ Ghuśmeśaṃ ca Śivālaye ||3||\n" +
      "Etāni jyotirliṅgāni sāyaṃ prātaḥ paṭhen naraḥ |\nsapta janmakṛtaṃ pāpaṃ smaraṇena vinaśyati ||4||\n" +
      "Eteśāṃ darśanādeva pātakaṃ nāśam eṣyati |\npunarjanma na caivāsti punarjanma na caivāsti ||5||",
    meaningHindi:
      "यह स्तोत्र भगवान शिव के बारह ज्योतिर्लिंगों के नाम लेता है: सौराष्ट्र में सोमनाथ, श्रीशैल में मल्लिकार्जुन, उज्जयिनी में महाकाल, ओंकारेश्वर, परली में वैद्यनाथ, डाकिनी वन में भीमशंकर, सेतुबंध में रामेश्वर, दारुकावन में नागेश्वर, वाराणसी में विश्वेश्वर, गौतमी तट पर त्र्यम्बक, हिमालय में केदार, और शिवालय में घुश्मेश्वर। इन्हें प्रातः-सायं पढ़ने से सात जन्मों के पाप नष्ट होते हैं।",
    meaningEnglish:
      "This concise stotra names all twelve Jyotirlingas — the self-manifested pillars of divine light of Lord Shiva: Somnath (Saurashtra), Mallikarjuna (Srishaila), Mahakal (Ujjain), Omkareshwar, Vaidyanath (Parali), Bhimashankar (Dakini forest), Rameswaram (Setubandha), Nageshwar (Darukavana), Vishweshwar (Varanasi), Trimbakeshwar (Gautami), Kedarnath (Himalayas), Grishneshwar (Shivalaya). Reciting morning and evening destroys sins of seven lifetimes and ends the cycle of rebirth.",
  },
  {
    id: "sankat-nashak-ganesh-stotra",
    name: "संकट नाशक गणेश स्तोत्र",
    deity: "Ganesha",
    faith: "Hindu",
    category: "Ganapatya",
    text:
      "॥ संकट नाशक गणेश स्तोत्र ॥\n" +
      "नारद उवाच —\nप्रणम्य शिरसा देवं गौरीपुत्रं विनायकम्। भक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये॥१॥\n" +
      "प्रथमं वक्रतुण्डं च एकदन्तं द्वितीयकम्। तृतीयं कृष्णपिङ्गाक्षं गजवक्त्रं चतुर्थकम्॥२॥\n" +
      "लम्बोदरं पञ्चमं च षष्ठं विकटमेव च। सप्तमं विघ्नराजेन्द्रं धूम्रवर्णं तथाष्टमम्॥३॥\n" +
      "नवमं भालचन्द्रं च दशमं तु विनायकम्। एकादशं गणपतिं द्वादशं तु गजाननम्॥४॥\n" +
      "द्वादशैतानि नामानि त्रिसन्ध्यं यः पठेन्नरः। न च विघ्नभयं तस्य सर्वसिद्धिर्भवेत् तदा॥५॥\n" +
      "विद्यार्थी लभते विद्यां धनार्थी लभते धनम्। पुत्रार्थी लभते पुत्रान् मोक्षार्थी लभते गतिम्॥६॥\n" +
      "जपेद्गणपतिस्तोत्रं षड्भिर्मासैः फलं लभेत्। संवत्सरेण सिद्धिं च लभते नात्र संशयः॥७॥\n" +
      "अष्टभ्यो ब्राह्मणेभ्यश्च लिखित्वा यः समर्पयेत्। तस्य विद्या भवेत् सर्वा गणेशस्य प्रसादतः॥८॥",
    transliteration:
      "|| Saṅkaṭa Nāśaka Gaṇeśa Stotra ||\n" +
      "Nārada uvāca — Praṇamya śirasā devaṃ Gaurī putram Vināyakam |\nbhaktāvāsaṃ smaren nityam āyuḥ kāmārtha siddhaye ||1||\n" +
      "Prathamaṃ Vakratuṇḍam ca Ekadantam dvitīyakam |\ntṛtīyam Kṛṣṇa piṅgākṣam Gajavaktram caturtham ||2||\n" +
      "Lambodaram pañcamaṃ ca ṣaṣṭham Vikaṭam eva ca |\nsaptamam Vighna rājendram Dhūmra varṇam tathāṣṭamam ||3||\n" +
      "Navamaṃ Bhāla candram ca daśamam tu Vināyakam |\nekādaśam Gaṇapatim dvādaśam tu Gajānanam ||4||\n" +
      "Dvādaśaitāni nāmāni tri sandhyam yaḥ paṭhen naraḥ |\nna ca vighna bhayam tasya sarva siddhir bhavet tadā ||5||\n" +
      "Vidyārthī labhate vidyāṃ dhanārthī labhate dhanam |\nputrārthī labhate putrān mokṣārthī labhate gatim ||6||\n" +
      "Japeḍ Gaṇapati stotram ṣaḍbhir māsaiḥ phalaṃ labhet |\nsaṃvatsareṇa siddim ca labhate nātra saṃśayaḥ ||7||\n" +
      "Aṣṭabhyo brāhmaṇebhyaśca likhitvā yaḥ samarpayeṭ |\ntasya vidyā bhavet sarvā Gaṇeśasya prasādataḥ ||8||",
    meaningHindi:
      "नारद मुनि द्वारा उपदिष्ट इस स्तोत्र में भगवान गणेश के बारह पवित्र नामों का वर्णन है: वक्रतुण्ड, एकदन्त, कृष्णपिंगाक्ष, गजवक्त्र, लम्बोदर, विकट, विघ्नराजेन्द्र, धूम्रवर्ण, भालचन्द्र, विनायक, गणपति, गजानन। इन्हें तीनों संध्याओं में पढ़ने से सभी विघ्न नष्ट होते हैं, विद्यार्थी विद्या, धनार्थी धन, और मोक्षार्थी मुक्ति पाते हैं।",
    meaningEnglish:
      "Narada recites the twelve sacred names of Lord Ganesha — Vakratunda, Ekadanta, Krishnapingaksha, Gajavaktra, Lambodara, Vikata, Vighnarajendra, Dhumravarna, Bhalchandra, Vinayaka, Ganapati, Gajanana. Reciting all twelve thrice daily removes all obstacles and grants all desires. Students gain education, the poor gain wealth, childless get children, and seekers attain liberation. Six months of recitation yields visible fruits; one year grants Siddhi.",
  },
  {
    id: "laxmi-narayan-stotra",
    name: "लक्ष्मी नारायण स्तोत्र",
    deity: "Vishnu",
    faith: "Hindu",
    category: "Vaishnava",
    text:
      "॥ लक्ष्मी नारायण स्तोत्र ॥\n" +
      "नमः कमलनाभाय नमस्ते जलशायिने। नमस्ते केशवानन्त वासुदेव नमोऽस्तु ते॥१॥\n" +
      "त्वमेव माता च पिता त्वमेव त्वमेव बन्धुश्च सखा त्वमेव।\nत्वमेव विद्या द्रविणं त्वमेव त्वमेव सर्वं मम देवदेव॥२॥\n" +
      "शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम् विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं वन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम्॥३॥\n" +
      "क्षीरसागरसम्भूते लक्ष्मि देवि नमोऽस्तु ते। पद्मपत्रविशालाक्षि विष्णुवक्षस्थले स्थिते॥४॥\n" +
      "यस्याः कटाक्षसमुपासनाविधिं सेवन्ते सर्वसुरपुङ्गवाः।\nसा माश्रयेत् करुणया भगवती भार्गवी भवतु मे वरदा॥५॥\n" +
      "सर्वमङ्गलमाङ्गल्ये विष्णुवक्षस्थलस्थिते। सर्वदुःखप्रशमनी महालक्ष्मि नमोऽस्तु ते॥६॥\n" +
      "लक्ष्मीनारायणाभ्यां च नमः श्रीपतये नमः। सर्वपापहराभ्यां च नमस्त्रैलोक्यपालने॥७॥",
    transliteration:
      "|| Lakṣmī Nārāyaṇa Stotra ||\n" +
      "Namaḥ kamala nābhāya namaste jala śāyine | namaste keśavānanta vāsudeva namo'stu te ||1||\n" +
      "Tvam eva mātā ca pitā tvam eva tvam eva bandhuśca sakhā tvam eva |\ntvam eva vidyā draviṇam tvam eva tvam eva sarvam mama devadeva ||2||\n" +
      "Śāntākāraṃ bhujaga śayanam padmanābham sureśam viśvādhāraṃ gagana sadṛśam megha varṇam śubhāṅgam |\nLakṣmī kāntam kamala nayanam yogibhir dhyāna gamyam vande Viṣṇum bhava bhaya haram sarvaloka eka nātham ||3||\n" +
      "Kṣīra sāgara sambhūte Lakṣmi devi namo'stu te | padma patra viśālākṣi Viṣṇu vakṣaḥ sthale sthite ||4||\n" +
      "Yasyāḥ kaṭākṣa samupāsanā vidhim sevante sarva sura puṅgavāḥ |\nsā māśrayet karuṇayā bhagavatī Bhārgavī bhavatu me varadā ||5||\n" +
      "Sarva maṅgala māṅgalye Viṣṇu vakṣaḥ sthala sthite | sarva duḥkha praśamanī Mahālakṣmi namo'stu te ||6||\n" +
      "Lakṣmī Nārāyaṇābhyāṃ ca namaḥ śrīpataye namaḥ | sarva pāpa harābhyāṃ ca namas trailokya pālane ||7||",
    meaningHindi:
      "यह स्तोत्र लक्ष्मी और नारायण की युगल स्तुति करता है। नारायण — कमलनाभ, जलशायी, शेषनाग पर विराजमान, विश्व के आधार, मेघवर्ण, योगियों द्वारा ध्यान में प्राप्त, सर्वलोकनाथ। माँ लक्ष्मी — क्षीरसागर से उत्पन्न, विष्णु के वक्षस्थल पर विराजित, सभी देवों द्वारा पूजित, भार्गवी, सर्वदुःख प्रशमनी। दोनों को प्रणाम करने से सभी पाप नष्ट होते हैं।",
    meaningEnglish:
      "This stotra praises the divine couple Lakshmi and Narayana together. Narayana is described as lotus-naveled, resting on the cosmic serpent, the foundation of the universe, dark like rain clouds, sought by yogis in meditation, the protector of all worlds. Lakshmi is praised as born from the ocean of milk, residing on Vishnu's chest, worshipped by all the gods, daughter of Bhrigu, and remover of all sorrows. Combined recitation invokes both blessings for complete prosperity and liberation.",
  },
  {
    id: "pitru-stotra",
    name: "पितृ स्तोत्र",
    deity: "Pitru",
    faith: "Hindu",
    category: "Pitru Puja",
    text:
      "॥ पितृ स्तोत्र ॥\n" +
      "अर्चितानाममूर्तानां पितृणां दीप्ततेजसाम्। नमस्याम्यहमेकाग्रो नित्यमेव सदा च तान्॥१॥\n" +
      "अभ्यतीतांस्तु ये पूर्वे तांश्च योऽभ्येत्य यास्यति। तेषां नमस्करोम्यग्रे पश्चाच्च मुनिपुङ्गवाः॥२॥\n" +
      "नमो वः पितरः सोम्या नमो वः पितर उग्राः। नमो वः पितरः सूर्याः नमो वः पितर एकेभ्यः॥३॥\n" +
      "नमो वः पितरः प्राच्यो नमो वः पितर उदीच्याः। नमो वः पितरः प्रतीच्यो नमो वः पितर दक्षिणाः॥४॥\n" +
      "ये वो देवाः ये च पितरः परेषां श्रेयसि स्थिताः। तेभ्यो नमस्करोम्यग्रे तान् विप्रान् श्रद्धया नमे॥५॥\n" +
      "आयान्तु पितरः सर्वे देवाश्च भुवि संस्थिताः। इमं श्राद्धं मया दत्तमन्नं तृप्ताः पिबन्तु ते॥६॥\n" +
      "पितृभ्यः स्वधा नमः पितामहेभ्यः स्वधा नमः। प्रपितामहेभ्यः स्वधा नमः अक्षय्यं स्वधास्तु वः॥७॥\n" +
      "ये केचित् पितरः सन्ति अस्माकं कुलगोत्रजाः। ते गृह्णन्तु मया दत्तमेतत् श्राद्धमनन्तरम्॥८॥",
    transliteration:
      "|| Pitṛ Stotra ||\n" +
      "Arcitānām amūrtānāṃ pitṛṇāṃ dīpta tejasām | namasyāmy aham ekāgro nityam eva sadā ca tān ||1||\n" +
      "Abhyatītāṃstu ye pūrve tāṃśca yo'bhyetya yāsyati | teṣāṃ namaskaro my agre paścāc ca muni puṅgavāḥ ||2||\n" +
      "Namo vaḥ pitaraḥ somyā namo vaḥ pitara ugrāḥ | namo vaḥ pitaraḥ sūryāḥ namo vaḥ pitara ekebhyaḥ ||3||\n" +
      "Namo vaḥ pitaraḥ prācyo namo vaḥ pitara udīcyāḥ | namo vaḥ pitaraḥ pratīcyo namo vaḥ pitara dakṣiṇāḥ ||4||\n" +
      "Ye vo devāḥ ye ca pitaraḥ pareṣāṃ śreyasi sthitāḥ | tebhyo namaskaro my agre tān viprān śraddhayā name ||5||\n" +
      "Āyāntu pitaraḥ sarve devāśca bhuvi saṃsthitāḥ | imaṃ śrāddham mayā dattam annaṃ tṛptāḥ pibantu te ||6||\n" +
      "Pitṛbhyaḥ svadhā namaḥ pitāmahebhyaḥ svadhā namaḥ | prapitāmahebhyaḥ svadhā namaḥ akṣayyaṃ svadhāstu vaḥ ||7||\n" +
      "Ye kecit pitaraḥ santi asmākaṃ kula gotra jāḥ | te gṛhṇantu mayā dattam etat śrāddham anantaram ||8||",
    meaningHindi:
      "यह स्तोत्र पितरों (पूर्वजों की आत्माओं) को नमन करता है — दीप्त तेजस्वी, अमूर्त, पूजनीय। सौम्य और उग्र पितरों को, सूर्यलोक में निवासी पितरों को, चारों दिशाओं के पितरों को प्रणाम। श्राद्ध में यह दत्त अन्न ग्रहण करें। पिता, पितामह और प्रपितामह — तीन पीढ़ियों के लिए 'स्वधा' का स्मरण। पितृ दोष निवारण, वंश में सुख-समृद्धि की कामना।",
    meaningEnglish:
      "This sacred stotra offers salutations to ancestral souls (Pitrus) — the radiant departed ancestors. It honors the gentle Pitrus (Somya), the fierce Pitrus (Ugra), those residing in the sun, and those in all four directions. The stotra invites all ancestors to accept the Shraddha offering, requests eternal peace (Akshayya Swadha) for three generations, and ensures that forgotten or unnamed ancestors also receive peace and liberation. Reciting during Pitru Paksha or Shraddha ceremonies removes Pitru Dosha.",
  },
];
